import { GuildConfigurationWeeklyCommands } from './commands/guild-configuratio/guild-configuration-weekly.commands';
import { PayoutCommands } from './commands/payout.commands';
import { SeedCommands } from './commands/seed.commands';
import { TestCommands } from './commands/test.commands';
import { WeeklyCommands } from './commands/weekly/weekly.commands';
import { NecordConfigService } from './configs/necord-config.service';
import { OrmConfigService } from './configs/orm-config.service';
import { GuildConfiguration } from './entities/guild-configuration.entity';
import { Weekly } from './entities/weekly.entity';
import { WeeklyParticipant } from './entities/weekly-participant.entity';
import { OnApplicationBootstrapHook } from './lifecycle/on-application-bootstrap.hook';
import { GuildConfigurationService } from './services/guild-configuration.service';
import { PayoutService } from './services/payout.service';
import { SeedService } from './services/seed.service';
import { WeeklyParticipantService } from './services/weekly-participant.service';
import type { ModuleMetadata } from '@nestjs/common';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NecordModule } from 'necord';

@Module({})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {
    public static register(testing = false) {
        const imports: ModuleMetadata['imports'] = [
            ConfigModule.forRoot({
                ignoreEnvFile: true,
                isGlobal: true,
            }),
            ...(testing
                ? [
                      TypeOrmModule.forRoot({
                          type: 'better-sqlite3',
                          database: ':memory:',
                          dropSchema: true,
                          synchronize: true,
                          entities: [WeeklyParticipant, Weekly, GuildConfiguration],
                      }),
                  ]
                : [
                      TypeOrmModule.forRootAsync({
                          useClass: OrmConfigService,
                      }),
                  ]),
            NecordModule.forRootAsync({
                useClass: NecordConfigService,
            }),
            TypeOrmModule.forFeature([WeeklyParticipant, Weekly, GuildConfiguration]),
        ];
        return {
            module: AppModule,
            imports,
            providers: [
                OnApplicationBootstrapHook,
                Logger,
                WeeklyParticipantService,
                PayoutService,
                SeedService,
                GuildConfigurationService,
                WeeklyCommands,
                PayoutCommands,
                SeedCommands,
                TestCommands,
                GuildConfigurationWeeklyCommands,
            ],
        };
    }
}
