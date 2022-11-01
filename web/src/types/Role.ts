import { ISectionSide } from "./Section";

export type IRole = {
    id: number; // id 为 0 是旁白
    // type: 'text' | 'voiceover';
    side: ISectionSide; // 1 为 left， 2 为 right
    name: string;
    intro: string;
    avatar: string;
}

export interface IActiveRole {
    roleId: number,
    side: ISectionSide,
    roleName: string;
    roleAvatar: string;
}

export interface ICreateRole extends Omit<IRole, 'id'> {
    id?: number;
}