/** 对话框内容 */
export interface IDialog {
    roleId: number;
    roleName: string;
    roleAvatar: string;
    id: number;
    type: 'text' | 'voiceover';
    content: string;
    side?: 'left' | 'right';
}


export type IEditAction = 'delete' | 'edit' | 'upInsert' | 'downInsert'
