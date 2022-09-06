import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);
    app.setGlobalPrefix(config.get('prefix'));
    const enableSwagger = config.get('enableSwagger');
    if (enableSwagger) {
        const options = new DocumentBuilder().setTitle('dialogua api').setVersion('1.0').build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(`${config.get('prefix')}-doc`, app, document);
    }

    const port = config.get('port');
    await app.listen(port);
    console.log(`app listen in ${port}`);
}
bootstrap();
