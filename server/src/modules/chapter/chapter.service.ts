import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/book.entity';
import { ChapterEntity } from 'src/db/chapter.entity';
import { CreateChapterDto } from 'src/dto/chapter.dto';
import { badReq, BOOK_NOT_EXIT, CREATE_FAIL } from 'src/expection';
import { text } from 'stream/consumers';
import { Repository } from 'typeorm';

@Injectable()
export class ChapterService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepo: Repository<BookEntity>,
        @InjectRepository(ChapterEntity)
        private readonly chapterRepo: Repository<ChapterEntity>,
    ) {}

    async create(bookId: number, body: CreateChapterDto) {
        const bookExit = await this.bookRepo.findOne({
            where: {
                id: bookId,
                del: false,
            },
        });

        if (!bookExit) return badReq(BOOK_NOT_EXIT);

        const chapter = new ChapterEntity();
        const book = new BookEntity();
        book.id = bookId;
        chapter.book = book;

        let textCount = 0;
        body.content.forEach((item) => {
            textCount += item.content.trim().length;
        });

        chapter.content = [];
        chapter.title = body.title;
        chapter.text_count = textCount;

        try {
            await this.chapterRepo.save(chapter);
        } catch {
            return badReq(CREATE_FAIL);
        }
    }
}
