import {useState} from "react";
import {ILoginRequest, ILoginResponse, Service} from "../../api/Service.tsx";
import {MdOutlineMailOutline} from "react-icons/md";
import {VscLock} from "react-icons/vsc";
import 'flowbite';
import img from './../../assets/user-login.png';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const api = Service();
    const handleSubmit = async () => {
        const login: ILoginRequest = {email: username, password: password};
        await api.login(login).then(
            response => {
                handleSuccess(response);
            }
        );
    }

    const handleSuccess = (response: ILoginResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('accessExpire', response.accessExpire.toString());
        localStorage.setItem('refreshExpire', response.refreshExpire.toString());
        location.href = '/';
    }

    return (
        <section className={'w-screen h-screen bg-white flex flex-row p-3'}>
            <div
                className={'w-2/5 h-[100%] bg-white text-center py-[5%] px-[8%] flex flex-col gap-5 justify-center items-center'}>
                <div className={'w-full h-auto text-center flex flex-col gap-2 '}>
                    <h1 className={'w-full text-gray-600 text-[30px] font-bold'}>
                        Login Account
                    </h1>
                    <p className={'w-full text-sm text-gray-500 font-medium'}>Send, spend and save smarter</p>
                </div>
                <form className="w-full text-left">
                    <div className="mb-5">
                        <label htmlFor="email"
                               className="flex flex-row items-center gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <MdOutlineMailOutline className={'text-[18px] font-bold text-blue-800'}/> Email
                            Address</label>
                        <input type="email" id="email"
                               onChange={(e) => {
                                   setUsername(e.target.value)
                               }}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password"
                               className="flex items-center flex-row gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <VscLock className={'text-[18px] font-bold text-blue-800'}/>
                            Password</label>
                        <input type="password" id="password"
                               onChange={(e) => {
                                   setPassword(e.target.value)
                               }}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required/>
                    </div>
                    <button type="button"
                            onClick={handleSubmit}
                            className="text-white mb-2 text-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login
                    </button>
                    <p className={'text-sm mr-1'}>Forgot password? <a href="#" className={'underline text-blue-600'}>click
                        here</a></p>
                </form>
            </div>
            <div
                className={'description w-3/5 h-[100%] flex flex-col items-center justify-center bg-gradient-to-tl from-blue-600 to-blue-300 rounded-xl'}>
                <img src={img} alt="./../../assets/user-login.png" className={'w-[50%] h-[50%]'}/>
                <div className={'w-[80%] text-center flex flex-col gap-2'}>
                    <h1 className={'text-[30px] font-bold text-white '}>
                        Speedy Easy and Faster
                    </h1>
                    <p className={'text-md text-left text-gray-100'}>
                        Lorem ipsum dolor sit amet consecrate radicalising elite. Aspersions omnibus ill, nobs official
                        sequin alias officio quasi militia deletion ea nemo sed vel repellents consequent image
                        consequent au tem vero nisei?
                    </p>
                </div>
            </div>
        </section>
    )
}