import {
    Button, Checkbox, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider, FormControlLabel, FormGroup,
    IconButton,
    InputAdornment,
    TablePagination,
    TextField,
    Tooltip
} from "@mui/material";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IUser, Service} from "../../../api/Service.tsx";
import {useNavigate} from "react-router-dom";
import {SearchIcon} from "primereact/icons/search";
import React, {useEffect, useRef, useState} from "react";
import Loading from "../../../hooks/BeatLoader.tsx";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {BiPlusCircle, BiSolidUserDetail} from "react-icons/bi";
import {getImage} from "../../../utils/ImageUtils.ts";
import ConfirmDialog from "../../../hooks/ConfirmDialog.tsx";
import toast from "react-hot-toast";
import {useAuthentication} from "../../../hooks/AuthContext.tsx";

export interface IUserFilter {
    search: string,
    page: number,
    size: number,
}

export interface IUserPage {
    totalPage: number,
    pageSize: number,
    size: number,
    totalElement: number,
    content: IUser[],
    currentPage: number,
}

export interface IRole {
    name: string,
    id: number,
    updatedAt: string,
    createdAt: string,
    description: string,
}

const User = () => {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [search, setSearch] = useState<string>('');
    const [checkedRoles, setCheckedRoles] = useState<Set<number>>(new Set());
    const [openAssignRole, setOpenAssignRole] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const {data: pages, isLoading, refetch} = useQuery<IUserPage>({
        queryKey: ['userPages', {search, page, rowsPerPage}],
        queryFn: () => Service().getAllUsers({search: search, page: page, size: rowsPerPage} as IUserFilter),
        select: (result: IUserPage) => {
            return result;
        },
    });

    const {user}= useAuthentication();

    console.log(user?.authorities)

    const {data: userRoles} = useQuery<IRole[]>({
        queryKey: ['userRoles', userId],
        initialData: () => [],
        queryFn: () => Service().getRolesFromUser(userId),
        enabled: userId !== 0,
        select: (data) => {
            return data;
        }
    });



    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(e.target.value);
    }


    const handleCloseAssignRole = () => {
        setOpenAssignRole(false);
    }

    const getStatusComponent = (status: boolean) => {
        return (
            status ?
                <span className={'text-green-600 text-[12.5px] rounded-md px-2.5 py-1.5 bg-[#dcfce7]'}>Enable</span>
                :
                <span className={'text-red-500 text-[12.5px] rounded-md px-2.5 py-1.5 bg-[#fee2e2]'}>Disable</span>
        )
    }

    const getRoles = (roles: string[]) => {
        return roles.map((role, index) => {
            return (
                <span key={index}
                      className={'p-2 py-1.5 rounded-lg bg-blue-100 text-[12.5px] text-blue-500 dark:text-gray-400 mx-1'}>
                    {role}
                </span>
            );
        })
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [open, setOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const handleButtonDelete = (id: number) => {
        setOpen(true);
        setDeleteId(id);
    }

    const confirmToDelete = (id: number) => {
        Service().deleteUser(id).then(async r => {
            if (r.status === 200) {
                toast.success("Deleted successfully");
                setOpen(!open);
                await refetch();
            } else {
                const data = await r.json();
                toast.error(data.message);
                console.log("Delete failed");
            }
        })
    }

    const {data: roles} = useQuery<IRole[]>({
        initialData: () => [],
        queryKey: ['getRole'],
        queryFn: () => Service().getAllRoles(),
        select: (result) => {
            return result;
        }
    });

    const handleCheckboxChange = (roleId: number) => {
        setCheckedRoles(prev => {
            const newSet = new Set(prev);
            if (newSet.has(roleId)) {
                newSet.delete(roleId);
            } else {
                newSet.add(roleId);
            }
            return newSet;
        });
    };

    const assignRolesMutation = useMutation({
        mutationFn: () => {
            return Service().assignRoleToUser(userId, Array.from(checkedRoles));
        },
        onSuccess: () => {
            handleCloseAssignRole();
            refetch().then();
        }
    });

    const assignRole = () => {
        assignRolesMutation.mutate();
    }

    useEffect(() => {
        if (userId && userId !== 0) {
            if (userRoles && userRoles.length > 0) {
                setCheckedRoles(new Set(userRoles.map(p => p.id)));
            } else {
                setCheckedRoles(new Set());  // Clear permissions if none are fetched
            }
        }
    }, [userId, userRoles]);

    const handleDialogAssignRole = (id: number) => {
        setUserId(id);
        setOpenAssignRole(true);
    }

    return (
        <div className={'w-full bg-white p-4 flex flex-col pb-10 gap-4 rounded-xl'}>

            <Dialog
                open={openAssignRole}
                onClose={handleCloseAssignRole}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={'text-[16px] text-gray-700'}>
                    Assign Role to user
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p className={'text-[15px] text-gray-600'}>please select role for assign to this user.</p>
                        <FormGroup>
                            {
                                roles.map(role => {
                                    return <FormControlLabel key={role.id} control={<Checkbox size={'small'}
                                        checked={checkedRoles.has(role.id)}
                                        onChange={() => handleCheckboxChange(role.id)}
                                    />} label={role.name}/>
                                })
                            }
                        </FormGroup>

                    </DialogContentText>
                </DialogContent>
                <Divider/>
                <DialogActions style={{padding: '20px'}}>
                    <Button size={'small'} onClick={handleCloseAssignRole}>Cancel</Button>
                    <Button size={'small'} onClick={assignRole} autoFocus>
                        Assign Role
                    </Button>
                </DialogActions>
            </Dialog>

            <Loading isLoading={isLoading}/>
            <ConfirmDialog open={open} handleClose={() => {
                setOpen(!open)
            }} handleConfirm={() => {
                confirmToDelete(deleteId)
            }} description={`Are you sure want to delete this user ?`} title={'Delete Confirmation.'}/>
            <h1 className={'text-[16px] text-gray-700 font-medium'}>
                User Management
            </h1>
            <div className={'flex flex-row justify-between'}>
                <TextField size={"small"} className={'w-[30%]'} defaultValue={''} ref={searchRef} onChange={(e) => {
                    handleSearchInputChange(e)
                }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               ),
                           }}
                />

                <Button className={'text-[13px] px-4 py-2'} variant={'contained'} color={'primary'} onClick={() => {
                    navigate('/users-management/create')
                }}>Create User</Button>


            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Roles
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pages?.content.map((user: IUser, index) => {
                            return (
                                <tr key={index}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-2 flex flex-row gap-3 items-center">
                                        <img src={user.image ? getImage(user.image) : 'src/assets/default-avatar.png'}
                                             alt={'src/assets/logo.png'} className={'w-9 h-9 rounded-full'}/>
                                        {user.firstName.concat(" ").concat(user.lastName)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRoles(user.roles)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusComponent(user.isEnable)}
                                    </td>
                                    <td className="px-4 py-2 flex justify-evenly items-center">
                                        <Tooltip title="Edit" arrow>
                                            <IconButton size={'medium'} onClick={() => {
                                                navigate('/users-management/edit/' + user.id)
                                            }}>
                                                <CiEdit className={'text-[#334155]'}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" arrow>
                                            <IconButton size={'medium'} onClick={() => {
                                                handleButtonDelete(user.id)
                                            }}>
                                                <MdDelete className={'text-gray-500'}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Detail" arrow>
                                            <IconButton size={'medium'} onClick={() => {
                                                navigate('/users-management/detail/' + user.id)
                                            }}>
                                                <BiSolidUserDetail className={'text-[#334155'}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Assign Role" arrow>
                                            <IconButton size={'medium'} onClick={() => {
                                                handleDialogAssignRole(user.id);
                                            }}>
                                                <BiPlusCircle className={'text-[#334155'}/>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
                <div className={'p-1 flex justify-end'}>
                    <TablePagination
                        className={'text-gray-600 text-md'}
                        component="div"
                        count={pages?.totalElement || 0}
                        page={!pages || pages.totalElement <= 0 ? 0 : page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 20, 50, 100]}
                    />
                </div>
            </div>
        </div>
    )
}
export default User;