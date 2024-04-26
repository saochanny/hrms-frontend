import axios from 'axios';

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

const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export function Service() {
    const instance = axios.create({
        baseURL: '/api/v1/auth',
        headers: header,
    });

    return {
        login: async (data: ILoginRequest) => {
            try {
                const response = await instance.post('/login', data);
                return response.data;
            } catch (error) {
                throw new Error(`Error during login: ${error}`);
            }
        },
        refresh: async (refreshToken: string) => {
            try {
                const response = await instance.post('/token/refresh', {refreshToken});
                return response.data;
            } catch (error) {
                throw new Error(`Error during refresh: ${error}`);
            }
        },
    };
}
