import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BookEntity } from './book.entity';

@Entity({
    name: 'book-role',
})
export class BookRoleEntity extends CustomBaseEntity {
    @Column({
        length: 20,
    })
    name: string;

    @Column({
        type: 'tinyint',
    })
    side: number;

    @Column({
        length: 200,
    })
    avatar: string;

    @Column({
        default: '',
        length: 300,
    })
    intro: string;

    @ManyToOne(() => BookEntity, (book) => book.roles)
    book: BookEntity;
}
