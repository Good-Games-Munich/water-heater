import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import type { NecordModuleOptions } from 'necord';

@Injectable()
export class NecordConfigService {
    public constructor(private readonly configService: ConfigService) {}

    public createNecordOptions(): NecordModuleOptions {
        return {
            token: this.configService.get<string>('DISCORD_BOT_TOKEN') ?? '',
            intents: [IntentsBitField.Flags.Guilds],
            development: this.getDevelopmentOptions(),
        };
    }

    private getDevelopmentOptions(): NecordModuleOptions['development'] {
        const developmentGuildId = this.configService.get<string>('DISCORD_DEVELOPMENT_GUILD_ID');

        if (!developmentGuildId) {
            return false;
        }

        return [developmentGuildId];
    }
}
