import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BookListDto, CreateBookDto, CreateBookResponse } from 'src/dto/book.dto';
import { BookService } from './book.service';
import { Public } from '../../decorator/public';
import { IJwtData } from 'src/types/user';
import { BookEntity } from 'src/db/book.entity';
import { IdParam } from 'src/dto/param.dto';
import { IBookDetailResponse } from 'src/types/book';

@ApiTags('书籍')
@ApiBearerAuth()
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation({ summary: '创建' })
    @ApiResponse({
        type: CreateBookResponse,
    })
    @Post()
    create(@Body() body: CreateBookDto, @Req() request: Request) {
        const userId = (request.user as IJwtData).userId;
        return this.bookService.create(userId, body);
    }

    /** 详情 */
    @Public()
    @Get('detail/:id')
    @ApiOperation({ summary: '书本详情' })
    @ApiResponse({
        type: IBookDetailResponse,
    })
    detail(@Param() param: IdParam) {
        return this.bookService.detail(param.id);
    }

    @ApiOperation({ summary: '获取列表' })
    @ApiResponse({ type: BookEntity })
    @Public()
    @Get()
    list(@Query() body: BookListDto) {
        return this.bookService.list(body);
    }

    @ApiOperation({ summary: '获取当前用户书籍列表' })
    @ApiResponse({
        type: BookEntity,
    })
    @Get('user')
    getUserBoolList(@Req() req: Request) {
        const userId = (req.user as IJwtData).userId;
        return this.bookService.getUserBooks(userId);
    }
}
