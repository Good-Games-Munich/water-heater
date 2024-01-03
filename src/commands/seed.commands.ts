import { SeedDto } from '../dtos/commands/seed.dto';
import { SeedService } from '../services/seed.service';
import { ComponentId } from '../shared/enums/component-id.enum';
import { Injectable, Logger } from '@nestjs/common';
import type { InteractionResponse, ModalActionRowComponentBuilder } from 'discord.js';
import {
    ActionRowBuilder,
    codeBlock,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import { changeLanguage, t } from 'i18next';
import {
    Context,
    Modal,
    ModalContext,
    ModalParam,
    Options,
    SlashCommand,
    SlashCommandContext,
} from 'necord';

@Injectable()
export class SeedCommands {
    // Constructor that injects Logger and SeedService
    public constructor(
        private readonly logger: Logger,
        private readonly seedService: SeedService,
    ) {}

    // SlashCommand decorator to define the onSeed method as a slash command
    @SlashCommand({
        name: 'seed',
        description: 'Group seed for challonge.',
        descriptionLocalizations: {
            de: 'Gruppen seed für challonge.',
        },
    })
    // Method to handle the seed command
    public async onSeed(
        @Context() [interaction]: SlashCommandContext,
        @Options() { numberOfGroups }: SeedDto,
    ): Promise<InteractionResponse<boolean> | undefined> {
        try {
            await changeLanguage(interaction.locale);

            // Create a text input for the seeded list
            const seededListInput = new TextInputBuilder()
                .setCustomId(ComponentId.SEEDED_LIST_INPUT)
                .setLabel(t('ui:seedModal.seededListInputLabel'))
                .setStyle(TextInputStyle.Paragraph);

            // Create a modal for the seed command
            const modal = new ModalBuilder()
                .setTitle(t('ui:seedModal.title'))
                .setCustomId(`${ComponentId.SEED_MODAL}/${numberOfGroups}`)
                .setComponents([
                    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([
                        seededListInput,
                    ]),
                ]);

            // Show the modal to the user
            await interaction.showModal(modal);

            return undefined;
        } catch (error) {
            this.logger.error('Seeding modal could not be opened: ', error);

            // Reply with an error message if the modal could not be opened
            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    // Modal decorator to define the onSeedSubmit method as a modal
    @Modal(`${ComponentId.SEED_MODAL}/:numberOfGroups`)
    // Method to handle the submission of the seed modal
    public async onSeedSubmit(
        @Context() [interaction]: ModalContext,
        @ModalParam('numberOfGroups') numberOfGroups: string,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            // Get the seeded list from the text input
            const seededList = interaction.fields
                .getTextInputValue(ComponentId.SEEDED_LIST_INPUT)
                .split('\n');

            // Generate seeded groups using the SeedService
            const seededGroups = this.seedService.generateSeededGroups(
                Number.parseInt(numberOfGroups, 10),
                seededList,
            );

            // Reply with the seeded groups
            return await interaction.reply({
                content: t('replies:commands.seed.successful', {
                    count: seededGroups.length,
                    seededGroups: codeBlock(seededGroups.join('\n')),
                }),
                ephemeral: true,
            });
        } catch (error) {
            this.logger.error('Seesing modal could not be submitted: ', error);

            // Reply with an error message if the modal could not be submitted
            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }
}
