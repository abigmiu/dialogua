import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChapterDto } from 'src/dto/chapter.dto';
import { IdParam } from 'src/dto/param.dto';
import { ChapterService } from './chapter.service';

@ApiTags('章节')
@Controller('chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService) {}

    @Post(':id')
    @ApiOperation({
        summary: '创建章节',
    })
    create(@Param() param: IdParam, @Body() body: CreateChapterDto) {
        return this.chapterService.create(+param.id, body);
    }
}
