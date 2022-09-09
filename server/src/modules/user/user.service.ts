import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { RoleEntity } from 'src/db/role.entity';
import { UserEntity } from 'src/db/user.entity';
import { CreateUserDto } from 'src/dto/user.dto';
import { badReq, SAME_EMAIL } from 'src/expection';
import { IJwtData } from 'src/types/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRedis()
        private readonly redis: Redis,
        private jwtService: JwtService,
    ) {}

    /** 生成 token */
    createToken(data: IJwtData) {
        const token = this.jwtService.sign(data);
        this.redis.hset('dialogua:token', token, 1);
        return token;
    }

    /** 注册用户 */
    async create(createUserDto: CreateUserDto) {
        const storeRes = await this.userRepo.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (storeRes) return badReq(SAME_EMAIL);

        const user = new UserEntity();
        user.nickname = createUserDto.nickname;
        user.password = createUserDto.password;
        user.email = createUserDto.email;

        const role = new RoleEntity();
        role.id = 1;
        user.role = role;

        const res = await this.userRepo.save(user);
        const data: IJwtData = {
            userId: res.id,
            roleId: res.role.id,
        };
        return this.createToken(data);
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
