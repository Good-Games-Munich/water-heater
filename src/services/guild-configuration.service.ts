import { GuildConfiguration } from '../entities/guild-configuration.entity';
import type { Day } from '../shared/enums/day.enum';
// eslint-disable-next-line import/no-cycle
import { WeeklyParticipantService } from './weekly-participant.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GuildConfigurationService {
    public constructor(
        @InjectRepository(GuildConfiguration)
        private readonly guildConfigurationRepository: Repository<GuildConfiguration>,
        @Inject(forwardRef(() => WeeklyParticipantService))
        private readonly weeklyParticipantService: WeeklyParticipantService,
    ) {}

    public async getGuildConfiguration(guildId: string): Promise<GuildConfiguration> {
        const guildConfiguration = await this.guildConfigurationRepository.findOneBy({ guildId });
        if (!guildConfiguration) {
            return await this.guildConfigurationRepository.save({ guildId });
        }

        return guildConfiguration;
    }

    public async updateDebugChannel(guildId: string, debugChannelId: string): Promise<void> {
        const guildConfiguration = await this.guildConfigurationRepository.findOneBy({ guildId });
        if (guildConfiguration) {
            guildConfiguration.debugChannelId = debugChannelId;
            await this.guildConfigurationRepository.save(guildConfiguration);
        } else {
            await this.guildConfigurationRepository.save({ guildId, debugChannelId });
        }
    }

    public async updateWeeklyDay(guildId: string, weeklyDay: Day): Promise<void> {
        await this.weeklyParticipantService.deleteFutureWeeklies(guildId);

        const guildConfiguration = await this.guildConfigurationRepository.findOneBy({ guildId });
        if (guildConfiguration) {
            guildConfiguration.weeklyDay = weeklyDay;
            await this.guildConfigurationRepository.save(guildConfiguration);
        } else {
            await this.guildConfigurationRepository.save({ guildId, weeklyDay });
        }
    }
}
