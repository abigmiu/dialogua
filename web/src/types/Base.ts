export interface IHttpResponse {
    code: number;
    data: any;
    msg: string;
}

export interface IPageData<T = unknown> {
    content: T[],
    total: number;
}