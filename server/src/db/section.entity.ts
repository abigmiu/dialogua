import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ChapterEntity } from './chapter.entity';

@Entity({
    name: 'section',
})
export class SectionEntity extends CustomBaseEntity {
    @Column()
    roleId: number;

    @Column()
    content: string;

    @Column()
    order: number;

    @ManyToOne(() => ChapterEntity, (chapter) => chapter.sections)
    chapter: ChapterEntity;
}
