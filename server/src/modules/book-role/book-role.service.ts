import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/book.entity';
import { BookRoleEntity } from 'src/db/bookRole.entity';
import { CreateBookRoleDto } from 'src/dto/bookRole.dto';
import { badReq, BOOK_NOT_EXIT, CREATE_FAIL } from 'src/expection';
import { Repository } from 'typeorm';

import { RoleSide, RoleType } from 'src/constant/role';

@Injectable()
export class BookRoleService {
    constructor(
        @InjectRepository(BookRoleEntity)
        private readonly bookRoleRepo: Repository<BookRoleEntity>,
        @InjectRepository(BookEntity)
        private readonly bookRepo: Repository<BookEntity>,
    ) {}

    async create(bookId: number, createDto: CreateBookRoleDto, userId: number) {
        const bookExit = await this.bookRepo.findOne({
            where: {
                user: {
                    id: userId,
                },
                id: bookId,
                del: false,
            },
        });

        if (!bookExit) return badReq(BOOK_NOT_EXIT);

        const book = new BookEntity();
        book.id = bookId;
        const bookRole = new BookRoleEntity();

        bookRole.name = createDto.name;
        bookRole.avatar = createDto.avatar;
        bookRole.intro = createDto.intro;
        bookRole.book = book;
        bookRole.side = createDto.side;

        try {
            const res = await this.bookRoleRepo.save(bookRole);
            return res;
        } catch (e) {
            console.log(e);
            return badReq(CREATE_FAIL);
        }
    }

    async update(roleId: number, dto: CreateBookRoleDto) {
        const bookRole = new BookRoleEntity();

        bookRole.id = roleId;
        if (dto.avatar) bookRole.avatar = dto.avatar;
        if (dto.intro) bookRole.intro = dto.intro;
        if (dto.name) bookRole.name = dto.name;

        await this.bookRoleRepo.save(bookRole);
        const res = await this.bookRoleRepo.findOne({
            where: {
                id: roleId,
            },
        });
        return res;
    }

    async list(bookId: number) {
        const res = await this.bookRoleRepo.find({
            where: {
                book: {
                    id: bookId,
                },
            },
        });
        res.forEach((item) => (item.side = item.side === 1 ? 'left' : 'right'));

        return res;
    }
}
