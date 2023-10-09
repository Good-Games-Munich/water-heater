import { Injectable } from '@nestjs/common';
import { type InteractionResponse, PermissionFlagsBits } from 'discord.js';
import { changeLanguage, t } from 'i18next';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class TestCommands {
    @SlashCommand({
        name: 'ping',
        description: 'Ping-Pong test command',
        descriptionLocalizations: {
            de: 'Ping-Pong Testbefehl',
        },
        defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    })
    public async onPing(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean>> {
        await changeLanguage(interaction.locale);

        return await interaction.reply({
            content: t('replies:commands.ping.successful'),
            ephemeral: true,
        });
    }
}
