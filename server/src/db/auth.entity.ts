import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({
    name: 'auth',
})
export class AuthEntity extends CustomBaseEntity {
    @Column()
    name: string;

    @Column()
    intro: string;

    @ManyToMany(() => RoleEntity, (role) => role.auths, {
        cascade: true,
    })
    roles: RoleEntity[];
}
