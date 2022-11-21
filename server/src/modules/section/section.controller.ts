import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SectionEntity } from 'src/db/section.entity';
import { Public } from 'src/decorator/public';
import { ApiPager } from 'src/decorator/swagger';
import { ChapterPageQuery } from 'src/dto/chapter.dto';
import { IdParam } from 'src/dto/param.dto';
import { SectionCreateDto, UpdateSectionDto } from 'src/dto/section.dto';
import { SectionService } from './section.service';

@ApiTags('段落')
@Controller('section')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @ApiOperation({
        summary: '创建',
    })
    @Post(':id')
    create(@Param() param: IdParam, @Body() body: SectionCreateDto) {
        return this.sectionService.create(+param.id, body);
    }

    @ApiOperation({
        summary: '删除',
    })
    @Delete(':id')
    delete(@Param() param: IdParam) {
        return this.sectionService.delete(+param.id);
    }

    @ApiOperation({
        summary: '编辑',
    })
    @Patch(':id')
    edit(@Param() param: IdParam, @Body() dto: UpdateSectionDto) {
        return this.sectionService.edit(+param.id, dto);
    }

    @ApiOperation({
        summary: '向前插入',
    })
    @Post('insertBefore/:id')
    insert(@Param() param: IdParam, @Body() dto: SectionCreateDto) {
        return this.sectionService.insertBefore(+param.id, dto);
    }

    @ApiOperation({
        summary: '向后插入',
    })
    @Post('insertAfter/:id')
    insetAfter(@Param() param: IdParam, @Body() dto: SectionCreateDto) {
        return this.sectionService.insertAfter(+param.id, dto);
    }

    @ApiOperation({
        summary: '章节段落列表',
    })
    @Get('list/:id')
    list(@Param() param: IdParam) {
        return this.sectionService.list(param.id);
    }

    @Public()
    @ApiOperation({ summary: '分页' })
    @Get('page/:id')
    @ApiPager(SectionEntity)
    page(@Param() param: IdParam, @Query() query: ChapterPageQuery) {
        return this.sectionService.page(param.id, query);
    }
}
