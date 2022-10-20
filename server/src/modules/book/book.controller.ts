import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BookListDto, CreateBookDto } from 'src/dto/book.dto';
import { BookService } from './book.service';
import { Public } from '../../decorator/public';
import { IJwtData } from 'src/types/user';

@ApiTags('书籍')
@ApiBearerAuth()
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation({
        summary: '创建',
    })
    @Post()
    create(@Body() body: CreateBookDto, @Req() request: Request) {
        const userId = (request.user as IJwtData).userId;
        return this.bookService.create(userId, body);
    }

    @ApiOperation({
        summary: '获取列表',
    })
    @Public()
    @Get()
    list(@Query() body: BookListDto) {
        return this.bookService.list(body);
    }

    @ApiOperation({
        summary: '获取当前用户书籍列表',
    })
    @Get('user')
    getUserBoolList(@Req() req: Request) {
        const userId = (req.user as IJwtData).userId;
        return this.bookService.getUserBooks(userId);
    }
}
