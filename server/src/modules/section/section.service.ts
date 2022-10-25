import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapterEntity } from 'src/db/chapter.entity';
import { SectionEntity } from 'src/db/section.entity';
import { SectionCreateDto, UpdateSectionDto } from 'src/dto/section.dto';
import { badReq, BOOK_NOT_EXIT, SECTION_NOT_EXIT } from 'src/expection';
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

        const lastOrder = exitChapter.order_count;
        section.sort = lastOrder + 1;
        exitChapter.order_count += 1;
        await this.chapterRepo.save(exitChapter);

        const res = await this.sectionRepo.save(section);
        return {
            id: res.id,
        };
    }

    async edit(sectionId: number, dto: UpdateSectionDto) {
        const exitSection = await this.sectionRepo.findOne({
            where: {
                id: sectionId,
                del: false,
            },
        });

        if (!exitSection) return badReq(SECTION_NOT_EXIT);

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

        if (!exitSection) return badReq(SECTION_NOT_EXIT);

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

        const section = new SectionEntity();
        section.chapter = exitSection.chapter;
        section.content = dto.content;
        section.roleId = dto.roleId;
        section.sort = exitSection.sort - 0.01;

        const res = await this.sectionRepo.save(section);
        return {
            id: res.id,
        };
    }

    async insertAfter(sectionId: number, dto: SectionCreateDto) {
        const exitSection = await this.sectionRepo.findOne({
            where: {
                id: sectionId,
                del: false,
            },
            relations: ['chapter'],
        });
        console.log(exitSection);

        if (!exitSection) return badReq(BOOK_NOT_EXIT);

        const section = new SectionEntity();
        section.chapter = exitSection.chapter;
        section.content = dto.content;
        section.roleId = dto.roleId;
        section.sort = exitSection.sort + 0.01;

        const chapter = await this.sectionRepo.findOne({
            where: {
                id: sectionId,
            },
            relations: ['chapter'],
        });
        const lastOrder = chapter.id;
        if (lastOrder <= exitSection.sort) {
            chapter.sort = section.id;
            await this.sectionRepo.save(section);
        }

        const res = await this.sectionRepo.save(section);
        return {
            id: res.id,
        };
    }
}
