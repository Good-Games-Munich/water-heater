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
    public constructor(
        private readonly logger: Logger,
        private readonly seedService: SeedService,
    ) {}

    @SlashCommand({
        name: 'seed',
        description: 'Groups a seeded list of participants into the specified group size.',
        descriptionLocalizations: {
            de: 'Gruppiert eine seeded Liste von Teilnehmern in die angegebene Gruppengröße.',
        },
    })
    public async onSeed(
        @Context() [interaction]: SlashCommandContext,
        @Options() { numberOfGroups }: SeedDto,
    ): Promise<InteractionResponse<boolean> | undefined> {
        try {
            await changeLanguage(interaction.locale);

            const seededListInput = new TextInputBuilder()
                .setCustomId(ComponentId.SEEDED_LIST_INPUT)
                .setLabel(t('ui:seedModal.seededListInputLabel'))
                .setStyle(TextInputStyle.Paragraph);

            const modal = new ModalBuilder()
                .setTitle(t('ui:seedModal.title'))
                .setCustomId(`${ComponentId.SEED_MODAL}/${numberOfGroups}`)
                .setComponents([
                    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([
                        seededListInput,
                    ]),
                ]);

            await interaction.showModal(modal);

            return undefined;
        } catch (error) {
            this.logger.error('Seeding modal could not be opened: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @Modal(`${ComponentId.SEED_MODAL}/:numberOfGroups`)
    public async onSeedSubmit(
        @Context() [interaction]: ModalContext,
        @ModalParam('numberOfGroups') numberOfGroups: string,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            const seededList = interaction.fields
                .getTextInputValue(ComponentId.SEEDED_LIST_INPUT)
                .split('\n');
            const seededGroups = this.seedService.generateSeededGroups(
                Number.parseInt(numberOfGroups, 10),
                seededList,
            );

            return await interaction.reply({
                content: t('replies:commands.seed.successful', {
                    seededGroups: codeBlock(seededGroups.join('\n')),
                }),
                ephemeral: true,
            });
        } catch (error) {
            this.logger.error('Seesing modal could not be submitted: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }
}
