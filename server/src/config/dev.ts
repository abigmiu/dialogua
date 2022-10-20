import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';
import { IAppConfig } from './type';

const dbPath = join(__dirname, '../db');
const entityContext = require.context('../db', true, /\.entity\.ts$/);

const meta = getMetadataArgsStorage().tables.map((tbl) => tbl.target);

const config: IAppConfig = {
    db: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'dialogua',
        charset: 'utf8mb4',
        entities: [
            ...entityContext.keys().map((id) => {
                const entityModule = entityContext(id);
                // We must get entity from module (commonjs)
                // Get first exported value from module (which should be entity class)
                const [entity] = Object.values(entityModule);
                return entity as any;
            }),
        ],
        synchronize: true,
        keepConnectionAlive: true,
    },

    enableSwagger: true,
    port: 3008,
    prefix: '/api',
    jwtSecret: '123456',
    redis: {
        config: {
            host: 'localhost',
            port: 6379,
        },
    },
};

export default config;
