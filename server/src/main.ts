import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validate.pipe';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { GlobalExceptionFilter } from './filter/otherException.filter';
import { HttpExceptionFilter } from './filter/httpException.filter';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(logger);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    const config = app.get(ConfigService);
    app.setGlobalPrefix(config.get('prefix'));
    const enableSwagger = config.get('enableSwagger');
    if (enableSwagger) {
        const options = new DocumentBuilder()
            .setTitle('dialogua api')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(`${config.get('prefix')}-doc`, app, document);
    }

    const port = config.get('port');
    await app.listen(port);
    console.log(`app listen in ${port}`);
}
bootstrap();
