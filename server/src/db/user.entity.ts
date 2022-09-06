import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BookEntity } from './book.entity';

/** 用户 */
@Entity({
    name: 'user',
})
export class UserEntity extends CustomBaseEntity {
    @Column({
        length: 50,
    })
    email: string;

    @Column({
        select: false,
    })
    password: string;

    @Column({
        length: 200,
    })
    avatar: string;

    @Column({
        length: 20,
    })
    nickname: string;

    @Column({
        default: 0,
    })
    status: number;

    @OneToMany(() => BookEntity, (book) => book.user)
    books: BookEntity[];
}
