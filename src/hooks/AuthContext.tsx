import {createContext, JSX, useContext, useEffect, useMemo, useState} from "react";
import {ILoginRequest, ILoginResponse, IUserInfo, Service} from "../api/Service.tsx";

interface AuthContextType {
    user: IUserInfo | null;
    login: (request: ILoginRequest) => Promise<IUserInfo>;
    logined: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null, // Initialize with null instead of a function
    login: async () => {
        throw new Error("Login function is not implemented");
    },
    logined: false,
});

export const AuthProvider = ({children}: { children: JSX.Element | JSX.Element[] }) => {
    const [user, setUser] = useState<IUserInfo | null>(null);
    const [logined, setLogined] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);

    const getUser = async () => {
        if (user) {
            return user;
        } else {
            const response = await Service().getUser();
            if (response.ok) {
                const userInfo = (await response.json()) as IUserInfo;
                setUser(userInfo);
                setLogined(true);
                await renewal(localStorage.getItem('refreshToken') as string);
            } else {
                setLogined(false);
                setUser(null);
            }
        }
        return {} as IUserInfo;
    };

    const login = async (request: ILoginRequest) => {
        const response = await Service().login(request);
        if (response.status === 401) {
            throw new Error("Unauthorized: username or password is incorrect");
        }
        if (response.status === 400) {
            throw new Error("invalid credentials");
        }
        if (response.status === 500) {
            const errorMessage = (
                <div>
                    We're sorry, but there was an error processing your request.
                    <br/>
                    Internal Server Error
                </div>
            );
            console.log(errorMessage);
            throw new Error("Internal Server Error");
        }

        const result: ILoginResponse = (await response.json()) as ILoginResponse;
        if (result) {
            storeToLocalStorage(result);
            location.reload();
            // return await getUser();
            const userinfo= await getUser();
            if(userinfo){
                setUser(userinfo);
                setLogined(true);
            }
            return userinfo;
        }
        return {} as IUserInfo;
    };

    const storeToLocalStorage = (response: ILoginResponse) => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("accessExpire", response.accessExpire.toString());
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("refreshExpire", response.refreshExpire.toString());
    }

    useEffect(() => {
        getUser().finally(() => {
            setChecked(true);
        });
    }, []);

    const renewal=async (refreshToken:string)=>{

        if (refreshToken || refreshToken!=='') {
            const response = await Service().refresh(refreshToken);
            if (response.ok) {
                const result = (await response.json()) as ILoginResponse;
                if (result) {
                    storeToLocalStorage(result);
                }
            }
        }

    }

    useEffect(() => {
        const accessExpireString = localStorage.getItem('accessExpire');
        const expire = accessExpireString ? parseInt(accessExpireString) : 0;
        const refresh = setInterval(async () => {
            const refreshToken = localStorage.getItem('refreshToken') || '';
            if (refreshToken){
                await renewal(refreshToken);
            }

        }, expire * 0.9);

        return () => clearInterval(refresh);
    },[]);

    const provider = useMemo(
        () => ({
            user,
            login,
            logined,
        }),
        [user, logined]
    );

    return <AuthContext.Provider value={provider}>{checked ? children : <div>...</div>}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthentication = () => {
    return useContext(AuthContext);
};
