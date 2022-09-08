import { CustomBaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { UserEntity } from './user.entity';

@Entity({
    name: 'role',
})
export class RoleEntity extends CustomBaseEntity {
    @Column()
    name: string;

    @Column()
    intro: string;

    @ManyToMany(() => AuthEntity, (auth) => auth.roles)
    @JoinTable()
    auths: AuthEntity[];

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];
}
