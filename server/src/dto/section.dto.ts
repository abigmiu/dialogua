import { ApiProperty } from '@nestjs/swagger';

export class SectionDto {
    @ApiProperty({
        description: '角色 ID',
    })
    roleId: number;

    @ApiProperty({
        description: '内容',
    })
    content: string;
}
