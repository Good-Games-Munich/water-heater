import { WeeklyParticipantService } from '../../services/weekly-participant.service';
import { ComponentId } from '../../shared/enums/component-id.enum';
import { ParticipantAlreadyConfirmedError } from '../../shared/errors/business/participant-already-confirmed.error';
import { ParticipantNotFoundError } from '../../shared/errors/business/participant-not-found.error';
import { WeeklyDecorator } from './weekly.commands-group';
import { Injectable, Logger } from '@nestjs/common';
import type { InteractionResponse, ModalActionRowComponentBuilder } from 'discord.js';
import {
    ActionRowBuilder,
    codeBlock,
    ModalBuilder,
    PermissionFlagsBits,
    StringSelectMenuBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import { changeLanguage, t } from 'i18next';
import {
    Context,
    Modal,
    ModalContext,
    SelectedStrings,
    SlashCommandContext,
    StringSelect,
    StringSelectContext,
    Subcommand,
} from 'necord';

@Injectable()
@WeeklyDecorator()
export class WeeklyCommands {
    public constructor(
        private readonly weeklyParticipantService: WeeklyParticipantService,
        private readonly logger: Logger,
    ) {}

    @Subcommand({
        name: 'bulk-confirm',
        nameLocalizations: {
            de: 'bulk-bestätigen',
        },
        description: 'Bulk confirm weekly participants',
        descriptionLocalizations: {
            de: 'Bestätigt mehrere weekly Teilnehmer',
        },
    })
    public async onBulkConfirm(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean> | undefined> {
        try {
            await changeLanguage(interaction.locale);

            if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
                return await interaction.reply({
                    content: t('replies:noPermissionError'),
                    ephemeral: true,
                });
            }

            const modal = new ModalBuilder()
                .setTitle(t('ui:weekly.bulkConfirmModal.title'))
                .setCustomId(ComponentId.WEEKLY_PARTICIPANTS_CONFIRM_MODAL)
                .setComponents([
                    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([
                        new TextInputBuilder()
                            .setCustomId(ComponentId.WEEKLY_PARTICIPANTS_BULK_CONFIRM_INPUT)
                            .setLabel(
                                t('ui:weekly.bulkConfirmModal.participantsBulkConfirmInputLabel'),
                            )
                            .setStyle(TextInputStyle.Paragraph),
                    ]),
                ]);

            await interaction.showModal(modal);

            return undefined;
        } catch (error) {
            this.logger.error('Bulk confirm modal could not be opened: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @Modal(ComponentId.WEEKLY_PARTICIPANTS_CONFIRM_MODAL)
    public async onBulkConfirmSubmit(
        @Context() [interaction]: ModalContext,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            if (!interaction.guildId) {
                return await interaction.reply({
                    content: t('replies:noGuildIdError'),
                    ephemeral: true,
                });
            }

            const weeklyParticipants = interaction.fields
                .getTextInputValue(ComponentId.WEEKLY_PARTICIPANTS_BULK_CONFIRM_INPUT)
                .split('\n');

            await this.weeklyParticipantService.bulkConfirmWeeklyParticipants(
                interaction.guildId,
                weeklyParticipants,
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.bulkConfirm.successful', {
                    participants: codeBlock(weeklyParticipants.join('\n')),
                }),
            });
        } catch (error) {
            this.logger.error('Bulk confirm modal could not submitted: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @Subcommand({
        name: 'bulk-deconfirm',
        nameLocalizations: {
            de: 'bulk-debestätigen',
        },
        description: 'Bulk deconfirm weekly participants',
        descriptionLocalizations: {
            de: 'Debestätigt mehrere weekly Teilnehmer',
        },
    })
    public async onBulkDeconfirm(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
                return await interaction.reply({
                    content: t('replies:noPermissionError'),
                    ephemeral: true,
                });
            }

            if (!interaction.guildId) {
                return await interaction.reply({
                    content: t('replies:noGuildIdError'),
                    ephemeral: true,
                });
            }

            const weeklyParticipants =
                await this.weeklyParticipantService.getAllWeeklyParticipantsByGuildId(
                    interaction.guildId,
                );

            if (weeklyParticipants.length === 0) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.bulkDeconfirm.noParticipantsFound'),
                    ephemeral: true,
                });
            }

            const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(ComponentId.WEEKLY_PARTICIPANTS_DECONFIRM_SELECTOR)
                    .setPlaceholder(
                        t('ui:weekly.bulkDeconfirmComponent.participantsSelectorPlaceholder'),
                    )
                    .setMaxValues(weeklyParticipants.length > 25 ? 25 : weeklyParticipants.length)
                    .setMinValues(1)
                    .setOptions(
                        weeklyParticipants.map(weeklyParticipant => ({
                            label: weeklyParticipant.name,
                            value: weeklyParticipant.name,
                        })),
                    ),
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.bulkDeconfirm.participantsSelectorOpen'),
                components: [row],
                ephemeral: true,
            });
        } catch (error) {
            this.logger.error('Bulk deconfirm selector could not be send: ', error);

            if (error instanceof ParticipantNotFoundError) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.bulkDeconfirm.participantNotFound'),
                    ephemeral: true,
                });
            }

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @StringSelect(ComponentId.WEEKLY_PARTICIPANTS_DECONFIRM_SELECTOR)
    public async onBulkDeconfirmSelected(
        @Context() [interaction]: StringSelectContext,
        @SelectedStrings() selected: string[],
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            if (!interaction.guildId) {
                return await interaction.reply({
                    content: t('replies:noGuildIdError'),
                    ephemeral: true,
                });
            }

            if (!selected[0]) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.bulkDeconfirm.noParticipantsSelected'),
                    ephemeral: true,
                });
            }

            await this.weeklyParticipantService.bulkDeconfirmWeeklyParticipants(
                interaction.guildId,
                selected,
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.bulkDeconfirm.successful', {
                    participants: codeBlock(selected.join('\n')),
                }),
            });
        } catch (error) {
            this.logger.error('Bulk deconfirm could not be submitted: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @Subcommand({
        name: 'confirm',
        nameLocalizations: {
            de: 'bestätigen',
        },
        description: 'Confirm your participation in the next weekly',
        descriptionLocalizations: {
            de: 'Bestätigt die Teilnahme an dem nächsten weekly',
        },
    })
    public async onConfirm(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            if (!interaction.guildId) {
                return await interaction.reply({
                    content: t('replies:noGuildIdError'),
                    ephemeral: true,
                });
            }

            await this.weeklyParticipantService.confirmNewWeeklyParticipant(
                interaction.guildId,
                interaction.user.displayName,
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.confirm.successful'),
            });
        } catch (error) {
            this.logger.error('Confirm could not be performed: ', error);

            if (error instanceof ParticipantAlreadyConfirmedError) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.confirm.alreadyConfirmed'),
                    ephemeral: true,
                });
            }

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @Subcommand({
        name: 'deconfirm',
        nameLocalizations: {
            de: 'debestätigen',
        },
        description: 'Deconfirm your participation in the next weekly',
        descriptionLocalizations: {
            de: 'Debestätigt die Teilnahme an dem nächsten weekly',
        },
    })
    public async onDeconfirm(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            if (!interaction.guildId) {
                return await interaction.reply({
                    content: t('replies:noGuildIdError'),
                    ephemeral: true,
                });
            }

            await this.weeklyParticipantService.deconfirmWeeklyParticipant(
                interaction.guildId,
                interaction.user.displayName,
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.deconfirm.successful'),
            });
        } catch (error) {
            this.logger.error('Deconfirm could not be performed: ', error);

            if (error instanceof ParticipantNotFoundError) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.deconfirm.participantNotFound'),
                    ephemeral: true,
                });
            }

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @Subcommand({
        name: 'participants',
        nameLocalizations: {
            de: 'teilnehmer',
        },
        description: 'Lists all weekly participants',
        descriptionLocalizations: {
            de: 'Listet alle weekly Teilnehmer auf',
        },
    })
    public async onParticipants(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            if (!interaction.guildId) {
                return await interaction.reply({
                    content: t('replies:noGuildIdError'),
                    ephemeral: true,
                });
            }

            const weeklyParticipants =
                await this.weeklyParticipantService.getAllWeeklyParticipantsByGuildId(
                    interaction.guildId,
                );

            if (weeklyParticipants.length === 0) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.participants.noParticipantsFound'),
                    ephemeral: true,
                });
            }

            return await interaction.reply({
                content: t('replies:commands.weekly.participants.successful', {
                    participants: codeBlock(
                        weeklyParticipants
                            .map(weeklyParticipant => weeklyParticipant.name)
                            .join('\n'),
                    ),
                }),
            });
        } catch (error) {
            this.logger.error('Participants could not be retrieved: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }
}
