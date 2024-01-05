import { GuildConfigurationService } from '../../services/guild-configuration.service';
import { ComponentId } from '../../shared/enums/component-id.enum';
import { Day } from '../../shared/enums/day.enum';
import { GuildConfigurationDecorator } from './guild-configuration.commands-group';
import { Injectable, Logger } from '@nestjs/common';
import type { InteractionResponse } from 'discord.js';
import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { changeLanguage, t } from 'i18next';
import {
    Context,
    SelectedStrings,
    SlashCommandContext,
    StringSelect,
    StringSelectContext,
    Subcommand,
} from 'necord';

@Injectable()
@GuildConfigurationDecorator({
    name: 'weekly',
    description: 'Configure the weekly for your guild',
    descriptionLocalizations: {
        de: 'Konfiguriert das weekly für deinen Server',
    },
})
export class GuildConfigurationWeeklyCommands {
    // Constructor that injects GuildConfigurationService and Logger
    public constructor(
        private readonly guildConfigurationService: GuildConfigurationService,
        private readonly logger: Logger,
    ) {}

    // Subcommand decorator to define the onConfigureWeeklyDay method as a subcommand of the weekly command
    @Subcommand({
        name: 'day',
        description: 'Configure the day of the weekly for your guild',
        descriptionLocalizations: {
            de: 'Konfiguriert den Tag des weeklies für deinen Server',
        },
    })
    // Method to handle the configuration of the day of the weekly
    public async onConfigureWeeklyDay(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            // Create an array of day options
            const dayOptions = Object.values(Day).map(day => ({
                label: t(`values:day.${day}`),
                value: day,
            }));

            // Create a row of components that includes a string select menu for selecting the day of the weekly
            const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(ComponentId.WEEKLY_DAY_SELECTOR)
                    .setPlaceholder(
                        t('ui:configure.weekly.dayComponent.weekDaySelectorPlaceholder'),
                    )
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions(dayOptions),
            );

            // Reply to the interaction with the row of components
            return await interaction.reply({
                content: t('replies:commands.configure.weekly.day.weekDaySelectorOpen'),
                components: [row],
                ephemeral: true,
            });
        } catch (error) {
            this.logger.error('Weekly day selector could not be send: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    // StringSelect decorator to define the onConfigureWeeklyDaySelected method as a string select handler for the weekly day selector
    @StringSelect(ComponentId.WEEKLY_DAY_SELECTOR)
    // Method to handle the selection of the day of the weekly
    public async onConfigureWeeklyDaySelected(
        @Context() [interaction]: StringSelectContext,
        @SelectedStrings() selected: string[],
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            // Check if the interaction has a guild ID
            if (!interaction.guildId) {
                return await interaction.reply({
                    content: t('replies:noGuildIdError'),
                    ephemeral: true,
                });
            }

            // Check if a day was selected
            if (!selected[0]) {
                return await interaction.reply({
                    content: t('replies:commands.configure.weekly.day.noWeekDaySelected'),
                    ephemeral: true,
                });
            }

            // Get the selected day and update the weekly day in the guild configuration service
            const selectedDay = Day[selected[0].toUpperCase() as keyof typeof Day];
            await this.guildConfigurationService.updateWeeklyDay(interaction.guildId, selectedDay);

            // Reply to the interaction with a successful message
            return await interaction.reply({
                content: t('replies:commands.configure.weekly.day.successful', {
                    weekDay: t(`values:day.${selectedDay}`),
                }),
            });
        } catch (error) {
            this.logger.error('Weekly day could not be selected', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }
}
