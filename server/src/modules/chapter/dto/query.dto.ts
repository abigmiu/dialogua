import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

/** 分页查询章节 */
export class QueryChapterPageDto {
    @ApiProperty({ description: '页数', required: false, default: 1 })
    @Type(() => Number)
    @IsOptional()
    page: number = 1;

    @ApiProperty({ description: '页码', required: false, default: 10 })
    @Type(() => Number)
    @IsOptional()
    size: number = 10;

    @ApiProperty({ description: '倒序', required: false, default: false })
    @Type(() => Boolean)
    @IsOptional()
    desc: boolean = false;
}
