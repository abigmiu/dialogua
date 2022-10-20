import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface IAppConfig {
    db: TypeOrmModuleOptions;
    enableSwagger: boolean;
    port: number;
    prefix: string;
    jwtSecret: string;
    redis: RedisModuleOptions;
}
