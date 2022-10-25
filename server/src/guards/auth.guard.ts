import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { ExecutionContext, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class RbacAuthGuard extends AuthGuard('jwt') {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private authService: AuthService,
        private reflector: Reflector,
    ) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<any> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        await this.authService.validate(token);
        return super.canActivate(context);
    }
}
