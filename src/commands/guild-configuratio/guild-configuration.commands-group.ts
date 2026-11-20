import { PermissionFlagsBits } from 'discord.js';
import { createCommandGroupDecorator } from 'necord';

export const GuildConfigurationDecorator = createCommandGroupDecorator({
    defaultMemberPermissions: [PermissionFlagsBits.Administrator], // Set the default member permissions for the command group
    description: 'Configure the bot for your guild', // Set the description of the command group
    descriptionLocalizations: {
        de: 'Konfiguriert den Bot für deinen Server', // Set the localized description of the command group
    },
    name: 'configure', // Set the name of the command group
    nameLocalizations: {
        de: 'konfigurieren', // Set the localized name of the command group
    },
});
