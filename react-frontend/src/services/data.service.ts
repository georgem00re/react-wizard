import axios, { type AxiosInstance, isAxiosError } from "axios";

export interface CustomError {
    error: string;
    msg: string;
}

interface ErrorResult {
    data: null;
    error: CustomError;
}

interface OkResult<T> {
    data: T;
    error: null;
}

const okResult = <T>(data: T): OkResult<T> => ({
    data,
    error: null,
});

const errorResult = (error: unknown): ErrorResult => ({
    data: null,
    error:
        isAxiosError(error) && error.response
            ? {
                error: error.response.data.error ?? error.response.statusText,
                msg: error.response.data.msg ?? error.message,
            }
            : {
                error: "Error",
                msg: "",
            },
});

const getRestApi = (): AxiosInstance => {
    return axios.create({
        baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    });
};

const getFileDownload = async (
    projectName: string,
    nodeVersion: number,
    typescript: boolean,
) => {
    try {
        const response = await getRestApi().get(
            `/download?projectName=${projectName}&nodeVersion=${nodeVersion}&typescript=${typescript}`, {
            responseType: "blob",
        });
        const objectUrl: string = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" })
        );
        return okResult({ objectUrl });
    } catch (error: unknown) {
        console.error(error);
        return errorResult(error);
    }
};

export const dataService = { getFileDownload };
