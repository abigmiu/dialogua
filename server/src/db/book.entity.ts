import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BookRoleEntity } from './bookRole.entity';
import { ChapterEntity } from './chapter.entity';
import { UserEntity } from './user.entity';

/** 书本 */
@Entity({
    name: 'book',
})
export class BookEntity extends CustomBaseEntity {
    @Column({
        length: 50,
    })
    title: string;

    @Column({
        length: 200,
    })
    cover: string;

    @Column({
        length: 500,
    })
    intro: string;

    @ManyToOne(() => UserEntity, (user) => user.books)
    user: UserEntity;

    @OneToMany(() => ChapterEntity, (chapter) => chapter.book)
    chapters: ChapterEntity[];

    @OneToMany(() => BookRoleEntity, (role) => role.book)
    roles: BookRoleEntity[];
}
