import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IJwtData } from 'src/types/user';
import Redis from 'ioredis';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RbacAuthGuard extends AuthGuard('jwt') {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector,
    ) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user as IJwtData;
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        const exit = await this.redis.hexists('dialogua:token', token);
        if (!exit) throw new UnauthorizedException();
        const tokenData: IJwtData = this.jwtService.verify(token, {
            secret: this.configService.get('jwtSecret'),
        });
        const roleId = tokenData.roleId;
        return true;
    }
}
