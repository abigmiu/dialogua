import { CustomBaseEntity } from 'src/common/base.entity';
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

    @ManyToOne(() => BookEntity, (book) => book.chapters)
    book: BookEntity;
}
