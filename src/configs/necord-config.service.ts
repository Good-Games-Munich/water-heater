import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import type { NecordModuleOptions } from 'necord';

@Injectable()
export class NecordConfigService {
    // Constructor that injects ConfigService
    public constructor(private readonly configService: ConfigService) {}

    // Method to create Necord options
    public createNecordOptions(): NecordModuleOptions {
        return {
            token: this.configService.get<string>('DISCORD_BOT_TOKEN') ?? '', // Get the Discord bot token from the environment variables
            intents: [IntentsBitField.Flags.Guilds], // Set the Discord bot intents
            development: this.getDevelopmentOptions(), // Get the development options
        };
    }

    // Method to get development options
    private getDevelopmentOptions(): NecordModuleOptions['development'] {
        const developmentGuildId = this.configService.get<string>('DISCORD_DEVELOPMENT_GUILD_ID');

        // Check if a development guild ID was set
        if (!developmentGuildId) {
            return false;
        }

        return [developmentGuildId];
    }
}
