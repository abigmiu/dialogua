import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadDto } from 'src/dto/upload.dto';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@ApiTags('上传')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
        private readonly configService: ConfigService,
    ) {}

    @Post()
    @ApiOperation({
        summary: '上传文件',
    })
    @ApiBody({
        description: '文件',
        type: UploadDto,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return `${this.configService.get('serverHost')}/${file.path}`;
    }
}
