import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/book.entity';
import { ChapterEntity } from 'src/db/chapter.entity';
import { CreateChapterDto } from 'src/dto/chapter.dto';
import { badReq, BOOK_NOT_EXIT, CREATE_FAIL } from 'src/expection';
import { handlePageData } from 'src/utils/pager';
import { text } from 'stream/consumers';
import { Repository } from 'typeorm';
import { QueryChapterPageDto } from './dto/query.dto';

@Injectable()
export class ChapterService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepo: Repository<BookEntity>,
        @InjectRepository(ChapterEntity)
        private readonly chapterRepo: Repository<ChapterEntity>,
    ) {}

    async detail(id: number) {
        const res = await this.chapterRepo.findOne({
            where: {
                id,
            },
        });
        return res;
    }

    async create(bookId: number, body: CreateChapterDto) {
        const bookExit = await this.bookRepo.findOne({
            where: {
                id: bookId,
                del: false,
            },
        });

        if (!bookExit) {
            badReq(BOOK_NOT_EXIT);
        }

        const chapter = new ChapterEntity();
        const book = new BookEntity();
        book.id = bookId;
        chapter.book = book;

        chapter.title = body.title;
        chapter.text_count = 0;

        try {
            const res = await this.chapterRepo.save(chapter);
            return {
                id: res.id,
            };
        } catch (e) {
            console.log(e);
            badReq(CREATE_FAIL);
        }
    }

    async update(chapterId: number, dto: CreateChapterDto) {
        const chapter = new ChapterEntity();
        chapter.id = chapterId;
        if (dto.title) {
            chapter.title = dto.title;
        }
        await this.chapterRepo.save(chapter);
    }

    async list(bookId: number) {
        const res = await this.chapterRepo.find({
            where: {
                book: {
                    id: bookId,
                },
            },
        });

        return res;
    }

    /** 分页查询数据 */
    async getPage(bookId: number, query: QueryChapterPageDto) {
        console.log(query.desc);
        const res = await this.chapterRepo.findAndCount({
            where: {
                book: {
                    id: bookId,
                },
            },
            take: query.size,
            skip: (query.page - 1) * query.size,
            order: {
                id: query.desc ? 'DESC' : 'ASC',
            },
        });

        return handlePageData(res);
    }
}
