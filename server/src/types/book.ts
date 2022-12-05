import { ConsoleLogger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class IBookDetailResponse {
    constructor(data: Partial<IBookDetailResponse>) {
        Object.assign(this, data);
    }

    @Expose()
    @ApiProperty({ description: 'id' })
    id: number;

    @Expose()
    @ApiProperty({ description: '标题' })
    title: string;

    @Expose()
    @ApiProperty({ description: '封面图' })
    cover: string;

    @Expose()
    @ApiProperty({ description: '简介' })
    intro: string;

    @Expose()
    @ApiProperty({ description: '作者名' })
    @Transform(({ obj }) => {
        return obj.user.nickname;
    })
    author: string;

    @Expose()
    @ApiProperty({ description: '作者 ID' })
    @Transform(({ obj }) => {
        return obj.user.id;
    })
    authorId: number;

    @Expose()
    @ApiProperty({ description: '作者头像' })
    @Transform(({ obj }) => {
        return obj.user.avatar;
    })
    authorAvatar: string;
}
