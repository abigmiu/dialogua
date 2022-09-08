import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BookEntity } from './book.entity';
import { RoleEntity } from './role.entity';

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
        default: '',
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

    @ManyToOne(() => RoleEntity, (role) => role.users)
    role: RoleEntity;
}
