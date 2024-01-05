import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async () => {
    const app = await NestFactory.create(
        AppModule.register(), // create a Nest application with the AppModule
        new FastifyAdapter({ logger: true }), // use the FastifyAdapter with logger enabled
    );

    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(description)
        .setVersion(version)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(80, '0.0.0.0'); // listen on port 80 and bind to all network interfaces
};

void bootstrap(); // call the bootstrap function
