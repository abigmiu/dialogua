export interface IBook {
    id: number;
    title: string;
    cover: string;
    intro: string;
}

export interface ICreateBook {
    title: string;
}

export interface ICreateBookResponse {
    id: number;
    chapterId: number;
}