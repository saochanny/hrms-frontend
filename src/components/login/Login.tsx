import {useState} from "react";
import {ILoginRequest} from "../../api/Service.tsx";
import {MdOutlineMailOutline} from "react-icons/md";
import {VscLock} from "react-icons/vsc";
import 'flowbite';
import * as yup from "yup";
import img from './../../assets/user-login.png';
import {useAuthentication} from "../../hooks/AuthContext.tsx";
import toast from "react-hot-toast";
import {Loading} from "../layout/Loading.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import "./login.css";

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);

    const schema = yup.object().shape({
        email: yup.string().email('The email field is invalid.').required('The email field is required.').required(),
        password: yup.string().required('The password field is required.')
    })

    const {login} = useAuthentication();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    function handleChange() {
        setInvalid(false);
    }

    const onSubmit = async (data: ILoginRequest) => {
        if (loading) return;
        setLoading(true);
        // const data: ILoginRequest = {email: username, password: password};
        login(data).then(
            () => {
                setLoading(false);

            }
        )
            .catch(e => {
                toast.error(e.message);
                setInvalid(true);
                setLoading(false);
            })
    }

    return (
        <section className={'w-screen h-screen bg-white flex flex-row p-3'}>
            <Loading isLoading={loading}/>
            <div
                className={'w-2/5 h-[100%] bg-white text-center py-[5%] px-[8%] flex flex-col gap-5 justify-center items-center'}>
                <div className={'w-full h-auto text-center flex flex-col gap-2 '}>
                    <h1 className={'w-full text-gray-600 text-[30px] font-bold'}>
                        Login Account
                    </h1>
                    <p className={'w-full text-sm text-gray-500 font-medium'}>Send, spend and save smarter</p>
                </div>
                <form className="w-full text-left" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="email"
                               className="flex flex-row items-center gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <MdOutlineMailOutline className={'text-[18px] font-bold text-blue-800'}/> Email
                            Address</label>
                        <input type="email" id="email"
                               {...register('email')}
                               placeholder={'Enter your email address'}
                               onInput={() => handleChange()}
                               className={errors.email || invalid ? 'invalid' : 'input'}
                        />
                        {errors.email && <p className={'errorMessage'}>{errors.email.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password"
                               className="flex items-center flex-row gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <VscLock className={'text-[18px] font-bold text-blue-800'}/>
                            Password</label>
                        <input type="password" id="password"
                               placeholder={'Enter your password'}
                               {...register('password')}
                               onInput={() => handleChange()}
                               className={errors.password || invalid ? 'invalid' : 'input'}
                        />
                        {errors.password && <p className={'errorMessage'}>{errors.password.message}</p>}
                    </div>
                    <button type="submit"
                            disabled={loading}
                        // onClick={handleSubmit}
                            className="text-white mb-2 text-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {
                            loading ? 'Loading...' : 'Login'
                        }
                    </button>
                    <p className={'text-sm mr-1'}>Forgot password? <a href="#" className={'underline text-blue-600'}>click
                        here</a></p>
                </form>
                <div className={'footer mt-14 '}>
                    Copyright &copy; 2024. <a href="#" className={'underline text-blue-600 text-sm font-semibold'}>All
                    right reserved</a>
                </div>
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