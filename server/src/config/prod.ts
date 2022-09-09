import { join } from 'path';

export default {
    db: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'blog',
        charset: 'utf8mb4',
        entities: [join(__dirname, '../db/**/*.entity{.js,.ts}')],
        migrations: [join(__dirname, '../migrations/**/*{.js,.ts}')],
        cli: {
            migrationsDir: 'src/migrations',
            entitiesDir: 'src/db',
        },
        synchronize: false,
    },
    enableSwagger: true,
    port: 3008,
    prefix: '/api',
    jwtSecret: '123456',
    redis: {
        host: 'localhost',
        port: 6379,
    },
};
