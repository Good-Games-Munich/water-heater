import { GuildConfiguration } from '../entities/guild-configuration.entity';
import { WeeklyParticipant } from '../entities/weekly-participant.entity';
import { Weekly } from '../entities/weekly.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type TypeOrmModuleOptions, type TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
    // Constructor that injects ConfigService
    public constructor(private readonly configService: ConfigService) {}

    // Method to create TypeORM options
    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            database: this.configService.get<string>('POSTGRES_DB'), // Get the PostgreSQL database name from the environment variables
            entities: [WeeklyParticipant, Weekly, GuildConfiguration], // Set the entities to be used by TypeORM
            host: 'postgres', // Set the database host to 'postgres'
            password: this.configService.get<string>('POSTGRES_PASSWORD'), // Get the PostgreSQL password from the environment variables
            synchronize: true, // Automatically synchronize the database schema with the entities
            type: 'postgres', // Set the database type to PostgreSQL
            username: this.configService.get<string>('POSTGRES_USER'), // Get the PostgreSQL username from the environment variables
        };
    }
}
