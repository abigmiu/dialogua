import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 } from 'uuid';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: `./upload/${new Date().toLocaleDateString()}`,
                filename(req, file, callback) {
                    const name = `${v4()}${path.extname(file.originalname)}`;
                    return callback(null, name);
                },
            }),
        }),
    ],
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {}
