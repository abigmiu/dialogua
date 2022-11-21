import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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
}
