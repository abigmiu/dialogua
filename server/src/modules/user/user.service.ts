import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/user.entity';
import { CreateUserDto } from 'src/dto/user.dto';
import { badReq, SAME_EMAIL } from 'src/expection';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

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

        await this.userRepo.save(user);
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
