import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ChapterEntity } from './chapter.entity';

@Entity({
    name: 'section',
})
export class SectionEntity extends CustomBaseEntity {
    @ApiProperty({ description: '角色 id' })
    @Column()
    roleId: number;

    @ApiProperty({ description: '内容' })
    @Column()
    content: string;

    @Exclude()
    @Column({
        type: 'float',
    })
    sort: number;

    @ManyToOne(() => ChapterEntity, (chapter) => chapter.sections)
    chapter: ChapterEntity;
}
