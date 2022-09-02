/** 对话框内容 */
export interface IDialog {
    roleId: number;
    roleName: string;
    roleAvatar: string;
    id: number;
    type: 'text' | 'voiceover' | 'pic' | 'voice';
    content: string;
    side?: 'left' | 'right';
    duration?: number;
}


export type IEditAction = 'delete' | 'edit' | 'upInsert' | 'downInsert'
