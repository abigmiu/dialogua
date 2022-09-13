export type ISectionOperateType = 'ADD' | 'DELETE' | 'EDIT' | 'INSERT_BEFORE' | 'INSERT_AFTER';

export interface ISection {
    id?: number;
    roleId: number;
    content: string;
    type: ISectionOperateType;
}
