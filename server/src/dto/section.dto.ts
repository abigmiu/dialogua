import { ApiProperty } from '@nestjs/swagger';
import { ISectionOperateType, ISectionSide } from 'src/types/section';

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
        description: ' 0 是旁白， 1 是 左边， 2是右边',
        enum: [0, 1, 2],
    })
    side: ISectionSide;
}

export class UpdateSectionDto {
    @ApiProperty({
        description: '内容',
    })
    content: string;
}
