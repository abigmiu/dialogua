import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/book.entity';
import { CreateBookDto } from 'src/dto/book.dto';
import { badReq, SAME_BOOK_NAME } from 'src/expection';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepo: Repository<BookEntity>,
    ) {}
    async create(createBookDto: CreateBookDto) {
        const sameNameRes = await this.bookRepo.findOne({
            where: {
                title: createBookDto.title,
                del: false,
            },
        });
        if (sameNameRes) return badReq(SAME_BOOK_NAME);
    }
}
