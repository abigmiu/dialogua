import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CustomBaseEntity } from 'src/common/base.entity';
import { ISection } from 'src/types/section';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BookEntity } from './book.entity';
import { SectionEntity } from './section.entity';

@Entity({
    name: 'chapter',
})
export class ChapterEntity extends CustomBaseEntity {
    @ApiProperty({ description: '标题' })
    @Column({
        length: 30,
    })
    title: string;

    @ApiProperty({ description: '字数' })
    @Column()
    text_count: number;

    @Exclude()
    @ApiProperty({ description: '段落数' })
    @Column({
        default: 0,
    })
    order_count: number;

    @ManyToOne(() => BookEntity, (book) => book.chapters)
    book: BookEntity;

    @OneToMany(() => SectionEntity, (section) => section.chapter)
    sections: SectionEntity[];
}
