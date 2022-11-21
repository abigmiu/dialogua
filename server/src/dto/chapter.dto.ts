import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Length } from 'class-validator';
import { IsIncludeBlank } from 'src/decorator/validate';
import { ISection } from 'src/types/section';
import { SectionCreateDto } from './section.dto';

export class CreateChapterDto {
    @ApiProperty({
        description: '名称',
    })
    @IsIncludeBlank()
    @Length(1, 20, {
        message: '标题 1 - 20 字',
    })
    title: string;
}

export class ChapterPageQuery {
    @ApiProperty({ description: 'page' })
    @Type(() => Number)
    @IsInt()
    page: number;

    @ApiProperty({ description: 'size' })
    @Type(() => Number)
    @IsInt()
    size: number;
}
