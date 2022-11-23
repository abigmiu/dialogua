export type ISectionSide = 0 | 1 | 2; // 0 是旁白， 1 是 左边， 2是右边

export interface ISectionCreateResponse {
    id: number
}

export interface ISectionItemResponse {
    id: number;
    roleId: number;
    content: string;
}

export interface ISectionItemResponseWithRole extends ISectionItemResponse {
    roleName: string;
    roleAvatar: string;
    side: ISectionSide;
}