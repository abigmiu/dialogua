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

    async create(bookId: number, createDto: CreateBookRoleDto) {
        const bookExit = await this.bookRepo.findOne({
            where: {
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
        bookRole.type = RoleType[createDto.type];

        const allowType = ['text', 'voiceover'];
        if (!allowType.includes(createDto.type)) {
            return badReq(CREATE_FAIL);
        }
        if (createDto.type === 'text') {
            const allowSide = ['left', 'right'];
            if (!allowSide.includes(createDto.side)) {
                return badReq(CREATE_FAIL);
            }
            bookRole.side = RoleSide[createDto.side];
        }

        try {
            await this.bookRoleRepo.save(bookRole);
        } catch (e) {
            return badReq(CREATE_FAIL);
        }
    }
}
