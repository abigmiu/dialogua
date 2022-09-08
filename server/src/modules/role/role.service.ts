import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/db/auth.entity';
import { RoleEntity } from 'src/db/role.entity';
import { CreateRoleDto } from 'src/dto/role.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepo: Repository<RoleEntity>,
        @InjectRepository(AuthEntity)
        private readonly authRepo: Repository<AuthEntity>,
    ) {}
    async create(body: CreateRoleDto) {
        const auth = new AuthEntity();
        auth.id = 1;

        const role = new RoleEntity();
        role.auths = [auth];
        role.name = body.name;
        role.intro = body.intro;

        await this.roleRepo.save(role);
    }
}
