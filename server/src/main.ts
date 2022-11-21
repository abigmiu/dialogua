import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validate.pipe';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { GlobalExceptionFilter } from './filter/otherException.filter';
import { HttpExceptionFilter } from './filter/httpException.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn'],
    });

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const config = app.get(ConfigService);
    app.setGlobalPrefix(config.get('prefix'));
    const port = config.get('port');

    app.useStaticAssets(join(__dirname, '../upload'), {
        prefix: `${config.get('prefix')}/upload`,
    });

    const enableSwagger = config.get('enableSwagger');
    if (enableSwagger) {
        const url = `${config.get('prefix')}-doc`;

        const options = new DocumentBuilder()
            .setTitle('dialogua api')
            .setDescription(`json 地址:  http://localhost:${port}${url}-json`)
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(url, app, document);
    }

    await app.listen(port);
    console.log(`app listen in ${port}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
