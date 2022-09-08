import { Module } from '@nestjs/common';
import { BookRoleService } from './book-role.service';
import { BookRoleController } from './book-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRoleEntity } from 'src/db/bookRole.entity';
import { BookEntity } from 'src/db/book.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookRoleEntity, BookEntity])],
    controllers: [BookRoleController],
    providers: [BookRoleService],
})
export class BookRoleModule {}
