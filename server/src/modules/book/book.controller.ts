import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookListDto, CreateBookDto } from 'src/dto/book.dto';
import { BookService } from './book.service';
import { Public } from '../../decorator/public';

@ApiTags('书籍')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation({
        summary: '创建',
    })
    @ApiBearerAuth()
    @Post()
    create(@Body() body: CreateBookDto, @Req() request: any) {
        return this.bookService.create(body);
    }

    @ApiOperation({
        summary: '获取列表',
    })
    @Public()
    @Get()
    list(@Query() body: BookListDto) {
        return this.bookService.list(body);
    }
}
