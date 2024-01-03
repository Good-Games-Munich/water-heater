import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

const bootstrap = async () => {
    const app = await NestFactory.create(
        AppModule.register(), // create a Nest application with the AppModule
        new FastifyAdapter({ logger: true }), // use the FastifyAdapter with logger enabled
    );

    await app.init(); // initialize the Nest application

    // await app.listen(80, '0.0.0.0'); // listen on port 80 and bind to all network interfaces
};

void bootstrap(); // call the bootstrap function
