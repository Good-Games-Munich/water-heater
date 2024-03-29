import type { WeeklyParticipant } from '../../entities/weekly-participant.entity';
import { WeeklyParticipantService } from '../../services/weekly-participant.service';
import { ComponentId } from '../../shared/enums/component-id.enum';
import { ParticipantAlreadyConfirmedError } from '../../shared/errors/business/participant-already-confirmed.error';
import { ParticipantNotFoundError } from '../../shared/errors/business/participant-not-found.error';
import { WeeklyNotFoundError } from '../../shared/errors/business/weekly-not-found.error';
import { getNicknameOrDisplayName } from '../../utils/interaction.util';
import { WeeklyDecorator } from './weekly.commands-group';
import { Injectable, Logger } from '@nestjs/common';
import type { InteractionResponse, ModalActionRowComponentBuilder } from 'discord.js';
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    codeBlock,
    ModalBuilder,
    PermissionFlagsBits,
    StringSelectMenuBuilder,
    TextInputBuilder,
    TextInputStyle,
    UserSelectMenuBuilder,
} from 'discord.js';
import { changeLanguage, t } from 'i18next';
import {
    Button,
    ButtonContext,
    Context,
    ISelectedMembers,
    ISelectedUsers,
    Modal,
    ModalContext,
    SelectedMembers,
    SelectedStrings,
    SelectedUsers,
    SlashCommand,
    SlashCommandContext,
    StringSelect,
    StringSelectContext,
    Subcommand,
    UserSelect,
    UserSelectContext,
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

            const selectRow = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
                new UserSelectMenuBuilder()
                    .setCustomId(ComponentId.WEEKLY_PARTICIPANTS_CONFIRM_SELECTOR)
                    .setPlaceholder(
                        t('ui:weekly.bulkConfirmComponent.participantsSelectorPlaceholder'),
                    )
                    .setMinValues(1)
                    .setMaxValues(25),
            );

            const freestyleRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId(ComponentId.WEEKLY_PARTICIPANTS_BULK_CONFIRM_FREESTYLE_BUTTON)
                    .setLabel(t('ui:weekly.bulkConfirmComponent.freestyleButtonLabel'))
                    .setStyle(ButtonStyle.Primary),
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.bulkConfirm.bulkConfirmComponentShown'),
                components: [selectRow, freestyleRow],
                ephemeral: true,
            });
        } catch (error) {
            this.logger.error('Bulk confirm components could not be send: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @Button(ComponentId.WEEKLY_PARTICIPANTS_BULK_CONFIRM_FREESTYLE_BUTTON)
    public async onBulkConfirmFreestyleButton(
        @Context() [interaction]: ButtonContext,
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

    @UserSelect(ComponentId.WEEKLY_PARTICIPANTS_CONFIRM_SELECTOR)
    public async onBulkConfirmSelected(
        @Context() [interaction]: UserSelectContext,
        @SelectedUsers() users: ISelectedUsers,
        @SelectedMembers() members: ISelectedMembers,
    ): Promise<InteractionResponse<boolean> | undefined> {
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

            let weeklyParticipants: string[] = [];

            try {
                weeklyParticipants = members.map(member => {
                    if ('nickname' in member && member.nickname) {
                        return member.nickname;
                    }

                    if ('nick' in member && member.nick) {
                        return member.nick;
                    }

                    if ('displayName' in member && member.displayName) {
                        return member.displayName;
                    }

                    throw new Error('Could not get nickname or display name');
                });
            } catch (error) {
                this.logger.error('Bulk confirm modal could not submitted: ', error);

                return await interaction.reply({
                    content: t('replies:unknownError'),
                    ephemeral: true,
                });
            }

            if (weeklyParticipants.length === 0) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.bulkConfirm.noParticipantsSelected'),
                    ephemeral: true,
                });
            }

            await this.weeklyParticipantService.bulkConfirmWeeklyParticipants(
                interaction.guildId,
                weeklyParticipants,
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.bulkConfirm.successful', {
                    count: weeklyParticipants.length,
                    participants: codeBlock(weeklyParticipants.join('\n')),
                }),
            });
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

            const weeklyParticipants = interaction.fields
                .getTextInputValue(ComponentId.WEEKLY_PARTICIPANTS_BULK_CONFIRM_INPUT)
                .split('\n');

            if (weeklyParticipants.length === 0) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.bulkConfirm.noParticipantsProvided'),
                    ephemeral: true,
                });
            }

            await this.weeklyParticipantService.bulkConfirmWeeklyParticipants(
                interaction.guildId,
                weeklyParticipants,
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.bulkConfirm.successful', {
                    count: weeklyParticipants.length,
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

            let weeklyParticipants: WeeklyParticipant[];
            try {
                weeklyParticipants =
                    await this.weeklyParticipantService.getAllWeeklyParticipantsByGuildId(
                        interaction.guildId,
                    );
            } catch (error) {
                if (error instanceof WeeklyNotFoundError) {
                    weeklyParticipants = [];
                } else {
                    throw error;
                }
            }

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
                    count: selected.length,
                    participants: codeBlock(selected.join('\n')),
                }),
            });
        } catch (error) {
            this.logger.error('Bulk deconfirm could not be submitted: ', error);

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

    @SlashCommand({
        name: 'confirm',
        nameLocalizations: {
            de: 'bestätigen',
        },
        description: 'Legacy use /weekly confirm instead',
        descriptionLocalizations: {
            de: 'Legacy benutze /weekly bestätigen stattdessen',
        },
    })
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
                getNicknameOrDisplayName(interaction),
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

    @SlashCommand({
        name: 'deconfirm',
        nameLocalizations: {
            de: 'debestätigen',
        },
        description: 'Legacy use /weekly deconfirm instead',
        descriptionLocalizations: {
            de: 'Legacy benutze /weekly debestätigen stattdessen',
        },
    })
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
                getNicknameOrDisplayName(interaction),
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
        name: 'history',
        nameLocalizations: {
            de: 'historie',
        },
        description: 'Lists pasts weekly participants',
        descriptionLocalizations: {
            de: 'Listet vergangene weekly Teilnehmer auf',
        },
    })
    public async onHistory(
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

            const pastWeeklyDates = await this.weeklyParticipantService.getWeeklyDates(
                interaction.guildId,
                25,
            );

            if (pastWeeklyDates.length === 0) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.history.noPastWeeklies'),
                    ephemeral: true,
                });
            }

            const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(ComponentId.WEEKLY_PARTICIPANTS_HISTORY_DATES_SELECTOR)
                    .setPlaceholder(
                        t('ui:weekly.historyComponent.participantsHistoryDatesSelectorPlaceholder'),
                    )
                    .setMaxValues(pastWeeklyDates.length > 25 ? 25 : pastWeeklyDates.length)
                    .setMinValues(1)
                    .setOptions(
                        pastWeeklyDates.map(pastWeeklyDate => ({
                            label: pastWeeklyDate.toLocaleDateString('de-DE'), // Hardcoded locale since slashes seem to be broken in discord
                            value: pastWeeklyDate.getTime().toString(),
                        })),
                    ),
            );

            return await interaction.reply({
                content: t('replies:commands.weekly.history.participantsHistoryDatesSelectorOpen'),
                components: [row],
                ephemeral: true,
            });
        } catch (error) {
            this.logger.error('History selector could not be send: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }

    @StringSelect(ComponentId.WEEKLY_PARTICIPANTS_HISTORY_DATES_SELECTOR)
    public async onHistorySelected(
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
                    content: t('replies:commands.weekly.history.noDatesSelected'),
                    ephemeral: true,
                });
            }

            const selectedDates = selected.map(
                selectedDate => new Date(Number.parseInt(selectedDate, 10)),
            );

            const weeklyParticipantHistories =
                await this.weeklyParticipantService.getWeeklyParticipantHistory(
                    interaction.guildId,
                    selectedDates,
                );

            const historyStrings = weeklyParticipantHistories.map(weeklyParticipantHistory => {
                const weeklyParticipants = weeklyParticipantHistory.participants.map(
                    weeklyParticipant => weeklyParticipant.name,
                );

                return `${weeklyParticipantHistory.date.toLocaleDateString(
                    'de-DE', // Hardcoded locale since slashes seem to be broken in discord
                )}:\n${weeklyParticipants.join('\n')}`;
            });

            return await interaction.reply({
                content: t('replies:commands.weekly.history.successful', {
                    history: codeBlock(historyStrings.join('\n\n')),
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

            let weeklyParticipants: WeeklyParticipant[];
            try {
                weeklyParticipants =
                    await this.weeklyParticipantService.getAllWeeklyParticipantsByGuildId(
                        interaction.guildId,
                    );
            } catch (error) {
                if (error instanceof WeeklyNotFoundError) {
                    weeklyParticipants = [];
                } else {
                    throw error;
                }
            }

            if (weeklyParticipants.length === 0) {
                return await interaction.reply({
                    content: t('replies:commands.weekly.participants.noParticipantsFound'),
                    ephemeral: true,
                });
            }

            return await interaction.reply({
                content: t('replies:commands.weekly.participants.successful', {
                    count: weeklyParticipants.length,
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
