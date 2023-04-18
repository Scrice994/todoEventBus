import axios, { AxiosRequestConfig } from "axios";
import { IHttpClient, Request } from "../interfaces/IHttpClient";

export class HttpClient implements IHttpClient{

    async sendRequestAxios(url: string, request: Request): Promise<any> {
        await axios({ url, ...this._requestToAxios(request)});
    }

    private _requestToAxios(request: Request): AxiosRequestConfig {
        return {
            method: request.method,
            headers: request.headers,
            data: request.body
        }
    }
}