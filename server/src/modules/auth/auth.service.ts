import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { IJwtData } from 'src/types/user';

@Injectable()
export class AuthService {
    constructor(
        @InjectRedis()
        private readonly redis: Redis,
        private jwtService: JwtService,
    ) {}

    createToken(data: IJwtData) {
        const token = this.jwtService.sign(data);
        this.redis.hset('dialogua:token', token, 1);
        return token;
    }
}
