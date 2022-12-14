import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/book.entity';
import { UserEntity } from 'src/db/user.entity';
import { BookListDto, CreateBookDto } from 'src/dto/book.dto';
import { badReq, BOOK_NOT_EXIT, CREATE_FAIL, SAME_BOOK_NAME } from 'src/expection';
import { IBookDetailResponse } from 'src/types/book';
import { LessThan, Repository } from 'typeorm';
import { ChapterService } from '../chapter/chapter.service';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepo: Repository<BookEntity>,
        private readonly chapterService: ChapterService,
    ) {}

    /** 详情 */
    async detail(id: number) {
        const res = await this.bookRepo.findOne({
            where: {
                id,
            },
            relations: ['user'],
        });

        if (!res) {
            return badReq(BOOK_NOT_EXIT);
        }

        return new IBookDetailResponse(res);
    }

    async create(userId: number, createBookDto: CreateBookDto) {
        const sameNameRes = await this.bookRepo.findOne({
            where: {
                title: createBookDto.title,
                del: false,
                user: {
                    id: userId,
                },
            },
        });
        if (sameNameRes) return badReq(SAME_BOOK_NAME);

        const book = new BookEntity();
        book.intro = createBookDto.intro;
        book.title = createBookDto.title;
        book.cover = createBookDto.cover;
        const user = new UserEntity();
        user.id = userId;
        book.user = user;

        try {
            const res = await this.bookRepo.save(book);
            const chapter = await this.chapterService.create(res.id, {
                title: '第一话',
            });
            return {
                id: res.id,
                chapterId: chapter.id,
            };
        } catch {
            return badReq(CREATE_FAIL);
        }
    }

    async list(dto: BookListDto) {
        let res;

        if (dto.lastId) {
            res = await this.bookRepo.find({
                where: { del: false, id: LessThan(dto.lastId) },
                take: dto.size,
                order: { id: 'DESC' },
            });
        } else {
            res = await this.bookRepo.find({
                where: { del: false },
                take: dto.size,
                order: { id: 'DESC' },
            });
        }

        return res;
    }

    /** 获取用户所有书籍 */
    async getUserBooks(userId: number) {
        const res = await this.bookRepo
            .createQueryBuilder('book')
            .where(`book.userId = ${userId}`)
            .orderBy({
                id: 'DESC',
            })
            .getMany();
        return res;
    }
}
