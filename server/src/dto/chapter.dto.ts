import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { IsIncludeBlank } from 'src/decorator/validate';
import { ISection } from 'src/types/section';
import { SectionDto } from './Section.dto';

export class CreateChapterDto {
    @ApiProperty({
        description: '名称',
    })
    @IsIncludeBlank()
    @Length(1, 20, {
        message: '标题 1 - 20 字',
    })
    title: string;

    @ApiProperty({
        description: '内容',
        isArray: true,
        type: SectionDto,
    })
    content: ISection[];
}
