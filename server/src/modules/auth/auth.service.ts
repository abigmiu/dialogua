import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async validate(token?: string) {
        console.log('token', token);
        if (!token) throw new UnauthorizedException();
        const exit = await this.redis.hexists('dialogua:token', token);
        console.log('exit', exit);
        if (!exit) throw new UnauthorizedException();
    }
}
