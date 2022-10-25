import { ApiProperty } from '@nestjs/swagger';

export type ISectionOperateType = 'ADD' | 'DELETE' | 'EDIT' | 'INSERT_BEFORE' | 'INSERT_AFTER';

export type ISectionSide = 0 | 1 | 2; // 0 是旁白， 1 是 左边， 2是右边

export interface ISection {
    id?: number;
    roleId: number;
    content: string;
    type: ISectionOperateType;
}
