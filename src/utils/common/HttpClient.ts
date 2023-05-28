import axios, { AxiosRequestConfig } from "axios";
import { IHttpClient, Request } from "../interfaces/IHttpClient";

export class HttpClient implements IHttpClient{

    async sendRequest(url: string, request: Request): Promise<any> {
        return await axios({ url, ...this._requestToFetch(request)});
    }

    private _requestToFetch(request: Request): AxiosRequestConfig {
        return {
            method: request.method,
            headers: request.headers,
            data: request.body
        }
    }
}