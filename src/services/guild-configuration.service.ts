import { GuildConfiguration } from '../entities/guild-configuration.entity';
import type { Day } from '../shared/enums/day.enum';
// eslint-disable-next-line import/no-cycle
import { WeeklyParticipantService } from './weekly-participant.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GuildConfigurationService {
    // Constructor that injects repositories and services
    public constructor(
        @InjectRepository(GuildConfiguration)
        private readonly guildConfigurationRepository: Repository<GuildConfiguration>,
        @Inject(forwardRef(() => WeeklyParticipantService))
        private readonly weeklyParticipantService: WeeklyParticipantService,
    ) {}

    // Method to get guild configuration
    public async getGuildConfiguration(guildId: string): Promise<GuildConfiguration> {
        // Get guild configuration or create a new guild configuration
        const guildConfiguration = await this.guildConfigurationRepository.findOneBy({ guildId });
        if (!guildConfiguration) {
            return await this.guildConfigurationRepository.save({ guildId });
        }

        return guildConfiguration;
    }

    // Method to update debug channel
    public async updateDebugChannel(guildId: string, debugChannelId: string): Promise<void> {
        // Update debug channel or create a new guild configuration
        const guildConfiguration = await this.guildConfigurationRepository.findOneBy({ guildId });
        if (guildConfiguration) {
            guildConfiguration.debugChannelId = debugChannelId;
            await this.guildConfigurationRepository.save(guildConfiguration);
        } else {
            await this.guildConfigurationRepository.save({ guildId, debugChannelId });
        }
    }

    // Method to update weekly day
    public async updateWeeklyDay(guildId: string, weeklyDay: Day): Promise<void> {
        await this.weeklyParticipantService.deleteFutureWeeklies(guildId);

        // Update weekly day or create a new guild configuration
        const guildConfiguration = await this.guildConfigurationRepository.findOneBy({ guildId });
        if (guildConfiguration) {
            guildConfiguration.weeklyDay = weeklyDay;
            await this.guildConfigurationRepository.save(guildConfiguration);
        } else {
            await this.guildConfigurationRepository.save({ guildId, weeklyDay });
        }
    }
}
