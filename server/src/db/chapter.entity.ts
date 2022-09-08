import { CustomBaseEntity } from 'src/common/base.entity';
import { ISection } from 'src/types/section';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BookEntity } from './book.entity';

@Entity({
    name: 'chapter',
})
export class ChapterEntity extends CustomBaseEntity {
    @Column({
        length: 30,
    })
    title: string;

    @Column({
        type: 'json',
    })
    content: ISection[];

    @Column()
    text_count: number;

    @ManyToOne(() => BookEntity, (book) => book.chapters)
    book: BookEntity;
}
