import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChapterPageQuery, CreateChapterDto } from 'src/dto/chapter.dto';
import { IdParam } from 'src/dto/param.dto';
import { ChapterService } from './chapter.service';
import { Public } from 'src/decorator/public';
import { ChapterEntity } from 'src/db/chapter.entity';

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

    @Public()
    @Get('list/:id')
    @ApiOperation({
        summary: '获取本书全部章节',
    })
    list(@Param() param: IdParam) {
        return this.chapterService.list(param.id);
    }

    @Put(':id')
    @ApiOperation({
        summary: '更新章节',
    })
    update(@Param() param: IdParam, @Body() body: CreateChapterDto) {
        return this.chapterService.update(param.id, body);
    }

    @Public()
    @Get(':id')
    @ApiOperation({
        summary: '章节详情',
    })
    @ApiResponse({
        type: ChapterEntity,
    })
    detail(@Param() param: IdParam) {
        return this.chapterService.detail(param.id);
    }
}
