import { PermissionFlagsBits } from 'discord.js';
import { createCommandGroupDecorator } from 'necord';

export const GuildConfigurationDecorator = createCommandGroupDecorator({
    name: 'configure',
    nameLocalizations: {
        de: 'konfigurieren',
    },
    description: 'Configure the bot for your guild',
    descriptionLocalizations: {
        de: 'Konfiguriert den Bot für deinen Server',
    },
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
});
