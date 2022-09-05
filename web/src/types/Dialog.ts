/** 对话框内容 */
export interface IDialog {
    /** 从角色中获取的 */
    roleId: number;
    roleName: string;
    roleAvatar: string;
    type: 'text' | 'voiceover';
    side?: 'left' | 'right';
    /** 非角色决定 */
    id?: number;
    renderId: string;
    content: string;
}


export type IEditAction = 'delete' | 'edit' | 'upInsert' | 'downInsert'
