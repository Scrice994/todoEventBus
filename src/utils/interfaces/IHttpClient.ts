export interface Request{
    method?: string
    headers?: any
    body?: any
}

export interface IHttpClient{
    sendRequestAxios(url: string, request: Request): Promise<any>
}