import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CustomBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: 'timestamp',
    })
    create_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    update_at: Date;

    @Exclude()
    @Column({
        default: false,
        select: false,
    })
    del: boolean;
}
