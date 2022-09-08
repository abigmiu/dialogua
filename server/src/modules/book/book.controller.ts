import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from 'src/dto/book.dto';
import { BookService } from './book.service';

@ApiTags('书籍')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation({
        summary: '创建',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() body: CreateBookDto) {
        return this.bookService.create(body);
    }
}
