import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/book.entity';
import { ChapterEntity } from 'src/db/chapter.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, ChapterEntity])],
    controllers: [ChapterController],
    providers: [ChapterService],
})
export class ChapterModule {}
