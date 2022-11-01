import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/book.entity';
import { ChapterModule } from '../chapter/chapter.module';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity]), ChapterModule],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
