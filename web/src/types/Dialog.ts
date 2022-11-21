import { sectionActionType } from "@/constant";
import { ISectionSide } from "./Section";

/** 对话框内容 */
export interface ISection {
    /** 从角色中获取的 */
    roleId: number;
    roleName: string;
    roleAvatar: string;
    side: ISectionSide;
    /** 对话框内容 */
    id: number;
    content: string;
}

export interface ISectionCreate extends Omit<ISection, 'id'> {}


export type ISectionAction = typeof sectionActionType[keyof typeof sectionActionType];
