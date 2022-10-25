import { removeUser, useUserStore } from '@/store/user';
import { IHttpResponse } from '@/types/Base';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Toast } from 'vant';

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});
instance.interceptors.response.use((response: AxiosResponse<IHttpResponse>) => {
    const normalStatus = [200, 201];
    if (!normalStatus.includes(response.status)) {
        Toast('服务器错误');
        return Promise.reject();
    }

    if (response.data.code === 401) {
        Toast('未登录或登录过期');
        removeUser();
    }

    if (response.data.code !== 200) {
        Toast(response.data.msg || '服务器错误');
        return Promise.reject();
    }

    return response.data.data;
});

export const http = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return instance.get(url, config);
    },
    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return instance.post(url, data, config);
    },
    put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return instance.put(url, data, config);
    },
    patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return instance.patch(url, data, config)
    },
    delete<T = any>(url: string, config?: AxiosRequestConfig) {
        return instance.delete(url, config)
    }
};
