import { GuildConfiguration } from '../entities/guild-configuration.entity';
import { Weekly } from '../entities/weekly.entity';
import { WeeklyParticipant } from '../entities/weekly-participant.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
    // Constructor that injects ConfigService
    public constructor(private readonly configService: ConfigService) {}

    // Method to create TypeORM options
    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres', // Set the database type to PostgreSQL
            host: 'postgres', // Set the database host to 'postgres'
            username: this.configService.get<string>('POSTGRES_USER'), // Get the PostgreSQL username from the environment variables
            password: this.configService.get<string>('POSTGRES_PASSWORD'), // Get the PostgreSQL password from the environment variables
            database: this.configService.get<string>('POSTGRES_DB'), // Get the PostgreSQL database name from the environment variables
            synchronize: true, // Automatically synchronize the database schema with the entities
            entities: [WeeklyParticipant, Weekly, GuildConfiguration], // Set the entities to be used by TypeORM
        };
    }
}
