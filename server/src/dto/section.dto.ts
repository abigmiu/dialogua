import { ApiProperty } from '@nestjs/swagger';
import { ISectionOperateType } from 'src/types/section';

export class SectionCreateDto {
    @ApiProperty({
        description: '角色 ID',
    })
    roleId: number;

    @ApiProperty({
        description: '内容',
    })
    content: string;

    @ApiProperty({
        description: '类型',
    })
    type: ISectionOperateType;
}

export class UpdateSectionDto {
    @ApiProperty({
        description: '内容',
    })
    content: string;
}
