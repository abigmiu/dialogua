import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        description: '名称',
    })
    name: string;

    @ApiProperty({
        description: '简介',
    })
    intro: string;

    @ApiProperty({
        description: '权限 ID',
        isArray: true,
        type: Number,
    })
    authIds: number[];
}
