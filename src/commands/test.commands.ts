import { Injectable } from '@nestjs/common';
import { type InteractionResponse, PermissionFlagsBits } from 'discord.js';
import { changeLanguage, t } from 'i18next';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class TestCommands {
    // SlashCommand decorator to define the onPing method as a slash command
    @SlashCommand({
        name: 'ping',
        description: 'Ping-Pong test command',
        descriptionLocalizations: {
            de: 'Ping-Pong Testbefehl',
        },
        defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    })
    // Method to handle the ping command
    public async onPing(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean>> {
        await changeLanguage(interaction.locale); // Change the language of the translator to the interaction locale

        // Reply to the interaction with a successful message
        return await interaction.reply({
            content: t('replies:commands.ping.successful'), // Get the successful message from the translator
            ephemeral: true, // Make the reply ephemeral
        });
    }
}
