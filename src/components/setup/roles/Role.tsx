import {useMutation, useQuery} from "@tanstack/react-query";
import {Service} from "../../../api/Service.tsx";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    FormControlLabel,
    FormGroup
} from "@mui/material";
import React, {useEffect, useState} from "react";

export interface Role {
    id: number,
    name: string,
    description: string,
}

export interface Permission {
    id: number,
    name: string,
}

export default function Role() {

    const [roleId, setRoleId]= useState<number>(0);
    const [roleName, setRoleName]= useState<string>('');
    const [checkedPermissions, setCheckedPermissions] = useState<Set<string>>(new Set());


    const {data} = useQuery<Role[]>({
        initialData: () => [],
        queryKey: ['roles'],
        queryFn: () => Service().getAllRoles(),
        select: (result: Role[]) => {

            return result;
        }
    });

    const {data: permissions} = useQuery<Permission[]>({
        initialData: ()=> [],
        queryKey: ['permissions'],
        queryFn: () => Service().listingPermissions(),
        select: (result)=>{
            return result;
        }
    });

    const {data: permissionFromRole} = useQuery<Permission[]>({
        initialData: ()=> [],
        queryKey: ['permission_from_role',roleId, roleName],
        queryFn: () => Service().getPermissionFromRole(roleId),
        select: (result)=>{
            return result;
        }
    });
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (role: Role) => {
        setRoleId(role.id);
        setRoleName(role.name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (roleId) {
            if (permissionFromRole && permissionFromRole.length > 0) {
                setCheckedPermissions(new Set(permissionFromRole.map(p => p.name)));
            } else {
                setCheckedPermissions(new Set());  // Clear permissions if none are fetched
            }
        }
    }, [roleId, permissionFromRole]);

    console.log("role id :", roleId);
    console.log("permission from role :", permissionFromRole)


    const handleCheckboxChange = (permissionName: string) => {
        setCheckedPermissions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(permissionName)) {
                newSet.delete(permissionName);
            } else {
                newSet.add(permissionName);
            }
            return newSet;
        });
    };

    const updatePermissionsMutation = useMutation({
        mutationFn: () => {
            return Service().assignPermissionToRole(roleName, Array.from(checkedPermissions));
        },
        onSuccess: () => {

            handleClose();
        }
    });

    const assignPermission=()=>{
        updatePermissionsMutation.mutate();
    }

    return (
        <div className={'w-full bg-white p-4 flex flex-col pb-10 gap-4'}>
            <h1 className={'text-[16px] text-gray-700 font-medium'}>
                Role Management
            </h1>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={'text-[16px] text-gray-700'}>
                    Assign Permissions to Role {roleName}
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p className={'text-gray-600 text-[14px]'}>please select permissions for this role.</p>
                        <div>
                            <FormGroup>
                                {
                                    permissions.map(((permission) => {
                                        return <FormControlLabel key={permission.id} control={<Checkbox size={'small'}
                                            checked={checkedPermissions.has(permission.name)}
                                            onChange={() => handleCheckboxChange(permission.name)}
                                        />} label={permission.name} />
                                    }))
                                }
                            </FormGroup>
                        </div>

                    </DialogContentText>
                </DialogContent>
                <Divider/>
                <DialogActions style={{padding: '20px'}}>
                    <Button size={'small'} onClick={handleClose}>Disagree</Button>
                    <Button size={'small'} onClick={assignPermission} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Role Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((role, index) => {
                            return (
                                <tr key={index}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {role.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {role.description}
                                    </td>
                                    <td className="px-6 w-[40%]">
                                        <div className={'flex flex-row gap-x-3'}>
                                            <Button onClick={()=>{handleClickOpen(role)}} variant={'outlined'}
                                                    className="font-medium text-[12.5px]">Assign Permission</Button>
                                            <Button onClick={()=>{handleClickOpen(role)}} variant={'outlined'} color={'error'}
                                                    className="font-medium text-[12.5px]">Delete</Button>
                                            <Button onClick={()=>{handleClickOpen(role)}} variant={'outlined'} color={'inherit'}
                                                    className="font-medium text-[12.5px]">Preview</Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>
        </div>
    )
}