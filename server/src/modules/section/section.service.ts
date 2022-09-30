import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapterEntity } from 'src/db/chapter.entity';
import { SectionEntity } from 'src/db/section.entity';
import { SectionCreateDto, UpdateSectionDto } from 'src/dto/section.dto';
import { badReq, BOOK_NOT_EXIT } from 'src/expection';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(SectionEntity)
        private readonly sectionRepo: Repository<SectionEntity>,
        @InjectRepository(ChapterEntity)
        private readonly chapterRepo: Repository<ChapterEntity>,
    ) {}

    async create(chapterId: number, dto: SectionCreateDto) {
        const exitChapter = await this.chapterRepo.findOne({
            where: {
                id: chapterId,
                del: false,
            },
        });

        if (!exitChapter) return badReq(BOOK_NOT_EXIT);

        const chapter = new ChapterEntity();
        chapter.id = chapterId;

        const section = new SectionEntity();
        section.chapter = chapter;
        section.content = dto.content;
        section.roleId = dto.roleId;

        await this.sectionRepo.save(section);
    }

    async edit(sectionId: number, dto: UpdateSectionDto) {
        const exitSection = await this.sectionRepo.findOne({
            where: {
                id: sectionId,
                del: false,
            },
        });

        if (!exitSection) return badReq(BOOK_NOT_EXIT);

        exitSection.content = dto.content;

        await this.sectionRepo.save(exitSection);
    }

    async delete(sectionId: number) {
        const exitSection = await this.sectionRepo.findOne({
            where: {
                id: sectionId,
                del: false,
            },
        });

        if (!exitSection) return badReq(BOOK_NOT_EXIT);

        exitSection.del = true;
        await this.sectionRepo.save(exitSection);
    }

    async insertBefore(sectionId: number, dto: SectionCreateDto) {
        const exitSection = await this.sectionRepo.findOne({
            where: {
                id: sectionId,
                del: false,
            },
            relations: ['chapter'],
        });

        if (!exitSection) return badReq(BOOK_NOT_EXIT);

        const chapter = new ChapterEntity();
        chapter.id = exitSection.chapter.id;

        const section = new SectionEntity();
        section.content = dto.content;
        section.roleId = dto.roleId;
        section.chapter = chapter;

        const sectionRes = await this.sectionRepo.save(section);
        const id = sectionRes.id;

        const chapterSectionIds = exitSection.chapter.sections;
        const index = chapterSectionIds.findIndex((id) => id === id);
        chapterSectionIds.splice(index - 1, id);

        chapter.sections = chapterSectionIds;
        await this.chapterRepo.save(chapter);
    }

    async insertAfter(sectionId: number, dto: SectionCreateDto) {
        const exitSection = await this.sectionRepo.findOne({
            where: {
                id: sectionId,
                del: false,
            },
            relations: ['chapter'],
        });

        if (!exitSection) return badReq(BOOK_NOT_EXIT);

        const chapter = new ChapterEntity();
        chapter.id = exitSection.chapter.id;

        const section = new SectionEntity();
        section.content = dto.content;
        section.roleId = dto.roleId;
        section.chapter = chapter;

        const sectionRes = await this.sectionRepo.save(section);
        const id = sectionRes.id;

        const chapterSectionIds = exitSection.chapter.sections;
        const index = chapterSectionIds.findIndex((id) => id === id);
        chapterSectionIds.splice(index, id);

        chapter.sections = chapterSectionIds;
        await this.chapterRepo.save(chapter);
    }
}
