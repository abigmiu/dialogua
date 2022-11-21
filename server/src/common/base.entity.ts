import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CustomBaseEntity {
    @ApiProperty({ description: 'id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: '创建时间' })
    @CreateDateColumn({
        type: 'timestamp',
    })
    create_at: Date;

    @ApiProperty({ description: '更新时间' })
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
