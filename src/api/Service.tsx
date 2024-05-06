


export interface IUserInfo {
    id: number,
    email: string,
    name: string,
    role: string[],

}


export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    accessExpire: number;
    refreshToken: string;
    refreshExpire: number;
}



export function Service() {

    const header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    return {
        getUser: async () => {
            return await fetch("/api/v1/auth/user", {
                method: 'GET',
                headers: header,

            });
        },
        login: async (request: ILoginRequest) => {
            return  await fetch("/api/v1/auth/login", {
                method: 'POST',
                headers: header,
                body: JSON.stringify(request),
            });
        },
        logout: async () => {
            return  await fetch("/api/v1/auth/logout", {
                method: 'POST',
                headers: header,
            });

        },
        refresh: async (refreshToken: string) => {
            return await fetch("/api/v1/auth/token/refresh?refreshToken=" + refreshToken, {
                method: 'POST',
                headers: header,
            });
        }
    };
}


