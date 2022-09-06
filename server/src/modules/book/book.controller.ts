import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from 'src/dto/book.dto';
import { BookService } from './book.service';

@ApiTags('书籍')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation({
        summary: '创建',
    })
    @Post()
    create(@Body() body: CreateBookDto) {
        return this.bookService.create(body);
    }
}
