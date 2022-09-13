import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from 'src/db/section.entity';
import { ChapterEntity } from 'src/db/chapter.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SectionEntity, ChapterEntity])],
    controllers: [SectionController],
    providers: [SectionService],
})
export class SectionModule {}
