import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
}
