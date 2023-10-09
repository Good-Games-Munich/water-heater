import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

const bootstrap = async () => {
    const app = await NestFactory.create(
        AppModule.register(),
        new FastifyAdapter({ logger: true }),
    );

    await app.init();

    // await app.listen(80, '0.0.0.0');
};

void bootstrap();
