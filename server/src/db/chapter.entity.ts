import { CustomBaseEntity } from 'src/common/base.entity';
import { ISection } from 'src/types/section';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BookEntity } from './book.entity';
import { SectionEntity } from './section.entity';

@Entity({
    name: 'chapter',
})
export class ChapterEntity extends CustomBaseEntity {
    @Column({
        length: 30,
    })
    title: string;

    @Column()
    text_count: number;

    @Column({
        default: 0,
    })
    order_count: number;

    @ManyToOne(() => BookEntity, (book) => book.chapters)
    book: BookEntity;

    @OneToMany(() => SectionEntity, (section) => section.chapter)
    sections: SectionEntity[];
}
