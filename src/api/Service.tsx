import {IFormUser} from "../components/setup/users/CreateUser.tsx";
import {IUserFilter} from "../components/setup/users/User.tsx";
import {IEditUser} from "../components/setup/users/EditUser.tsx";

export interface IUserInfo {
    id: number,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    image: string,
    authorities: string[],
}

export interface Role {
    id: number,
    name: string,
    description: string,
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

export interface IUser {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string,
    roles: string[],
    id: number,
    isEnable: boolean,
    createdAt: string,
    updatedAt: string,
    image: string,
}

export function Service() {

    const header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    const headerFormData = {
        Accept: 'application/json',
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
            return await fetch("/api/v1/auth/login", {
                method: 'POST',
                headers: header,
                body: JSON.stringify(request),
            });
        },
        logout: async () => {
            return await fetch("/api/v1/auth/logout", {
                method: 'POST',
                headers: header,
            });

        },
        refresh: async (refreshToken: string) => {
            return await fetch("/api/v1/auth/token/refresh?refreshToken=" + refreshToken, {
                method: 'POST',
                headers: header,
            });
        },
        getAllRoles: async () => {
            const response = await fetch("/api/v1/roles", {
                method: 'GET',
                headers: header,
            });
            return await response.json();
        },
        createRole: async (data: Role) => {
            return await fetch("/api/v1/roles", {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data),
            })
        },
        getAllUsers: async (filter: IUserFilter) => {
            const response = await fetch(`/api/v1/users?search=${filter.search}&page=${filter.page}&size=${filter.size}`, {
                method: 'GET',
                headers: header,
            });
            return await response.json();
        },

        uploadImage: async (file: FormData) => {
            const response = await fetch("/api/v1/files/upload", {
                headers: headerFormData,
                method: 'POST',
                body: file,
            });
            return await response.json();
        },
        createUser: async (data: IFormUser) => {
            return await fetch("/api/v1/users", {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data),
            });
        },

        getUserById: async (id: string | undefined) => {
            const response = await fetch(`/api/v1/users/${id}`, {
                method: 'GET',
                headers: header,
            });
            return await response.json();
        },
        updateUser: async (id: string, data: IEditUser) => {
            return await fetch(`/api/v1/users/${id}`, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data),
            });
        },
        deleteUser: async (id: number) => {
            return await fetch(`/api/v1/users/${id}`, {
                method: 'DELETE',
                headers: header,
            })
        },
        removeUserProfile: async (id: string | undefined) => {
            return await fetch(`/api/v1/users/${id}/profile`, {
                method: 'DELETE',
                headers: header,
            })
        },
        verifyLink: async (token: string) => {
            return await fetch("/api/v1/mail-verifies?token=" + token, {
                method: 'GET',
            });
        },

        createPassword: async (data: { password: string; token: string }) => {
            return await fetch("/api/v1/mail-verifies/create-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        },
        listingPermissions: async () => {
            const response = await fetch("/api/v1/permissions", {
                method: 'GET',
                headers: header,
            });
            return await response.json();
        },
        getPermissionFromRole: async (roleId: number) => {
            const response = await fetch(`/api/v1/roles/${roleId}/permission`, {
                method: 'GET',
                headers: header,
            });
            return await response.json();
        },

        assignPermissionToRole: async (roleName: string, permissions: string[]) => {
            return await fetch(`/api/v1/roles/${roleName}`, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(permissions),
            });
        },

        getRolesFromUser: async (userId: number)=>{
            const response = await fetch(`/api/v1/users/${userId}/roles`, {
                method: 'GET',
                headers: header,
            });
            return await response.json();
        },
        assignRoleToUser: async (userId: number, roles: number[])=>{
            const response= await fetch(`/api/v1/users/${userId}/assign-roles`,{
                method: 'PUT',
                headers: header,
                body: JSON.stringify(roles),
            });
            return await response.json();
        },

    }
}


