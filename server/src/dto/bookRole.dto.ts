import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRoleDto {
    @ApiProperty({
        description: '名称',
    })
    name: string;

    @ApiProperty({
        description: '简介',
    })
    intro?: string;

    @ApiProperty({
        description: '头像',
    })
    avatar?: string;

    @ApiProperty({
        description: '位置 1 为 left， 2 为 right',
    })
    side: number;
}
