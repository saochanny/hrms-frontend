import {Alert, Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {Service} from "../../api/Service.tsx";
import {useSearchParams} from "react-router-dom";
import Loading from "../../hooks/HashLoader.tsx";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {delay} from "../../utils/DelayUtil.tsx";


export interface ICreatePassword {
    password: string,
    confirmPassword: string,
}

const CreatePassword = () => {
    const [searchParams,] = useSearchParams();
    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const schema = yup.object({
        password: yup.string().required('Password is required').min(3, 'Password must be at least 3 characters long'),
        confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), ''], 'Passwords must match'),
    });


    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({resolver: yupResolver(schema)});

    useEffect(() => {
        const verifyToken = async () => {
            const token = searchParams.get('token') || '';
            setToken(token);
            const response = await Service().verifyLink(token);
            setIsLoading(true);
            await delay(1500);
            if (response.ok) {
                setIsValid(true);
            } else {
                setIsValid(false);
                const result = await response.json();
                setErrorMessage(result.message);
            }
            setIsLoading(false);

        };
        verifyToken().then();

    }, [searchParams]);

    const onSubmit: SubmitHandler<ICreatePassword> = (data) => {
        mutation.mutate(data);
    }

    const mutation = useMutation({
        mutationFn: (data: ICreatePassword) => Service().createPassword({password: data.password, token: token}),
        mutationKey: ['Create-Password'],
        onError: error => {
            setErrorMessage(error.message);
            console.log(error)
        },
        onSuccess: () => {
            toast.success("Create password successfully!.");
            setIsLoading(false);
            location.reload();
        },
        onMutate: () => {
            setIsLoading(true);
        }

    })


    return (
        <div className={'w-screen h-screen bg-gray-50 flex justify-center items-center'}>
            <Loading isLoading={isLoading}/>
            {
                isValid ?
                    <form onSubmit={handleSubmit(onSubmit)}
                          className={'flex w-[40%] h-auto flex-col gap-y-5 bg-white shadow-xl p-5 py-8 mt-[-20%] rounded-lg'}>
                        <h1 className={'text-[22px] font-medium text-[#075985] text-center '}>Create your Password</h1>
                        <TextField {...register('password')} size={'medium'} label={'Password'} type={'password'}
                                   error={!!errors.password}
                                   helperText={errors.password ? errors.password.message : null}
                        />
                        <TextField {...register('confirmPassword')} size={'medium'} label={'Confirm Password'}
                                   type={'password'}
                                   error={!!errors.confirmPassword}
                                   helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
                        />
                        <Button type={'submit'} size={'medium'} variant={'contained'}
                                className={'py-3 mt-3'}>Submit</Button>
                    </form>

                    :

                    <Alert className={'w-[500px] text-lg items-center mt-[-20%]'} variant={'outlined'}
                           severity="info">{errorMessage}</Alert>
            }
        </div>
    )
}
export default CreatePassword;