import {Button, FormControlLabel, Switch, TextField} from "@mui/material";
import NoImage from "../../../../src/assets/no-image.jpg";
import {MdDelete, MdOutlineDriveFolderUpload} from "react-icons/md";
import {ChangeEvent, useState} from "react";
import {Service} from "../../../api/Service.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../hooks/HashLoader.tsx";
import {getImage} from "../../../utils/ImageUtils.ts";

export interface IFormUser {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    isEnable: boolean,
    tempPath?: string | undefined,
}

const CreateUser = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [base64,setBase64] = useState<string>('');

    const delay = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const schema = yup.object({
        firstName: yup.string().required("firstName is required"),
        lastName: yup.string().required("lastName is required"),
        email: yup.string().email("Invalid email format").required("email is required").matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
        ),
        username: yup.string().required("username is required"),
        isEnable: yup.boolean().required(),
        tempPath: yup.string(),
    }).required();

    const {
        register, handleSubmit,
        setValue,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [image, setImage] = useState<string | null>(null);

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('file', file);
            Service().uploadImage(formData).then((response) => {
                setValue('tempPath', response.filePath);
                setBase64(response.file);
            });

        } else {
            console.log('Please select a file')
            return;
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setValue('tempPath', "");
    }

    const handleCancel = () => {
        console.log("cancel");
        setImage(null);
        reset();
    }


    const onSubmit: SubmitHandler<IFormUser> = async (data) => {
        console.log(data);
        setLoading(true);
        const response = await Service().createUser(data);
        if (response.ok) {
            await delay(1500);
            toast.success("User created successfully");
            reset();
            setImage(null);
            setLoading(false);
            navigate("/users-management");
        } else {
            setLoading(false);
            const error = await response.json();
            toast.error(error.message,);
            console.log("Failed to create user");
        }

    }
    return (
        <div className={'w-full h-full flex flex-col'}>
            <Loading isLoading={loading}/>
            <h1 className={'text-[16px] text-gray-700 font-medium p-4'}>
                Create User
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={'flex bg-white flex-row w-full items-start p-4 py-10 flex-wrap gap-y-5 shadow-lg rounded-xl'}
                  encType={'multipart/form-data'}>
                <div className={'body flex flex-row flex-wrap gap-x-10 gap-y-5  w-[75%]'}>
                    <TextField {...register("firstName")} tabIndex={1} className={'w-[340px]'} size={'small'}
                               inputProps={{style: {fontSize: '13.5px'}}}
                               error={!!errors.firstName}
                               helperText={errors.firstName ? errors.firstName.message : null}
                               id="input-field-1" label="First Name"
                               variant="outlined"/>
                    <TextField {...register("lastName")} tabIndex={2} className={'w-[340px]'} size={'small'}
                               inputProps={{style: {fontSize: '13.5px'}}}
                               id="input-field-2" label="Last Name"
                               error={!!errors.lastName}
                               helperText={errors.lastName ? errors.lastName.message : null}
                               variant="outlined"/>
                    <TextField {...register("username")} tabIndex={3} className={'w-[340px]'} size={'small'}
                               inputProps={{style: {fontSize: '13.5px'}}}
                               id="input-field-3" label="Username"
                               error={!!errors.username}
                               helperText={errors.username ? errors.username.message : null}
                               variant="outlined"/>
                    <TextField {...register("email")} tabIndex={4} className={'w-[340px]'} size={'small'}
                               inputProps={{style: {fontSize: '13.5px'}}}
                               id="input-field-4" label="Email"
                               error={!!errors.email}
                               helperText={errors.email ? errors.email.message : null}
                               variant="outlined"/>
                    <FormControlLabel id="form-control-8" tabIndex={8} className={'pl-3 text-gray-600'}
                                      sx={{flexDirection: 'row-reverse'}} label="Enable"
                                      control={<Switch {...register("isEnable")} defaultChecked/>}/>
                </div>
                <div className={'photo w-[25%] bg-gray-100 p-5 flex flex-col items-center justify-center gap-y-5'}>
                    <div className={'flex relative justify-center overflow-hidden rounded-md w-[70%] bg-sky-200 h-48'}>
                        <img className="w-full h-full" src={base64!=='' ? getImage(base64) : NoImage}
                             alt="image description"/>
                        {
                            image &&
                            <div className={'absolute bottom-0 right-0 p-1 bg-gray-200 hover:cursor-pointer'}
                                 onClick={() => {
                                     handleRemoveImage();
                                 }}>
                                <MdDelete className={'w-4'}/>
                            </div>
                        }

                    </div>
                    <div
                        className={'button-browse w-auto rounded-md bg-blue-500 h-[35px] flex items-center relative cursor-pointer text-white'}>
                        <p className={'flex gap-2 px-3 items-center text-[14px]'}>
                            Select Photo
                            <MdOutlineDriveFolderUpload className={'w-5 h-5'}/>
                        </p>
                        <input type="file" onChange={(e) => {
                            handleChangeImage(e)
                        }}
                               className={'absolute top-0 left-0 z-1 w-full h-full cursor-pointer opacity-0'}/>
                    </div>
                </div>
                <div className={'button-group w-full justify-start mt-10 flex flex-row gap-5'}>
                    <Button variant={'outlined'} size={'small'} onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant={'contained'} type={'submit'} size={'small'}>
                        Create
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default CreateUser;