import { GuildConfiguration } from '../entities/guild-configuration.entity';
import { Weekly } from '../entities/weekly.entity';
import { WeeklyParticipant } from '../entities/weekly-participant.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
    public constructor(private readonly configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'postgres',
            username: this.configService.get<string>('POSTGRES_USER'),
            password: this.configService.get<string>('POSTGRES_PASSWORD'),
            database: this.configService.get<string>('POSTGRES_DB'),
            synchronize: true,
            entities: [WeeklyParticipant, Weekly, GuildConfiguration],
        };
    }
}
