import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty({
        description: '标题',
    })
    @Column({
        length: 50,
    })
    title: string;

    @ApiProperty({
        description: '封面图',
    })
    @Column({
        length: 200,
    })
    cover: string;

    @ApiProperty({
        description: '简介',
    })
    @Column({
        default: '',
        length: 500,
    })
    intro: string;

    @ApiProperty({
        description: '所属用户',
        type: () => UserEntity,
    })
    @ManyToOne(() => UserEntity, (user) => user.books)
    user: UserEntity;

    @ApiProperty({
        description: '章节',
    })
    @OneToMany(() => ChapterEntity, (chapter) => chapter.book)
    chapters: ChapterEntity[];

    @ApiProperty({
        description: '书本角色',
    })
    @OneToMany(() => BookRoleEntity, (role) => role.book)
    roles: BookRoleEntity[];
}
