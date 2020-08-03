import axios, {AxiosRequestConfig} from 'axios';
import {TokenStore} from "app/service/TokenStore";
import {browserHistory} from "index";
import qs from 'qs';

const BACKEND_URL = (window as any).env.API_URL;
const tokenStore = new TokenStore();

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        console.error('The request was made but no response was received');

        //AppNotification.error("Сервер временно недоступен");
        return Promise.reject(error);
    }

    const {status, data, config} = error.response;

    console.error(`The server responded with a status code ${status}`);

    if (status === 401) {
        //browserHistory.push(LOGIN_PAGE_URL);
    }

    if (status === 403) {
        //browserHistory.push(FORBIDDEN_PAGE_URL);
    }

    if (status === 404 && config.method === 'get') {
        // not found
    }

    if (status === 500) {
        //AppNotification.error("Что-то пошло не так");
    }

    return Promise.reject(error);
});

/**
 * Клиент для выполнения http-запросов к API
 */
export default class ApiClient {

    getRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
        const headers: any = {'Content-Type': 'application/json'};

        const token = tokenStore.token;

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return {
            baseURL: BACKEND_URL,
            paramsSerializer: (params) => qs.stringify(params, {
                skipNulls: true,
                arrayFormat: 'repeat'
            }),
            ...config,
            headers: {
                ...headers,
                ...config?.headers
            },
        };
    }

    public async executeGetRequest(url: string, params: any = null): Promise<any> {
        const response = await axios.get(url, this.getRequestConfig({params}));

        return response.data;
    };

    public async executePostRequest(url: string, body: any): Promise<any> {
        const response = await axios.post(url, body, this.getRequestConfig());

        return response.data;
    };

    public async executePutRequest(url: string, body: any): Promise<any> {
        const response = await axios.put(url, body, this.getRequestConfig());

        return response.data;
    };

    public async executeDeleteRequest(url: string) {
        const response = await axios.delete(url, this.getRequestConfig());

        return response.data;
    };

    public async executeUpload(url: string, file: File | Blob) {
        const config: AxiosRequestConfig = {
            headers: {"Content-type": file.type}
        }
        const response = await axios.post(url, file, this.getRequestConfig(config));
        return response.data;
    };

    public async executeDownload(url: string) {
        const config: AxiosRequestConfig = {
            responseType: "blob"
        }
        const response = await axios.get(url, this.getRequestConfig(config));
        return response.data;
    };

}
