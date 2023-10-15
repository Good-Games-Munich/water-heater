import { PayoutDto } from '../dtos/commands/payout.dto';
import { PayoutService } from '../services/payout.service';
import { Injectable, Logger } from '@nestjs/common';
import { type InteractionResponse } from 'discord.js';
import { changeLanguage, t } from 'i18next';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class PayoutCommands {
    public constructor(
        private readonly logger: Logger,
        private readonly payoutService: PayoutService,
    ) {}

    @SlashCommand({
        name: 'payout',
        nameLocalizations: {
            de: 'auszahlung',
        },
        description: 'Calculate the payouts after 50/30/20.',
        descriptionLocalizations: {
            de: 'Berechnet die Auszahlung nach 50/30/20.',
        },
    })
    public async onPayout(
        @Context() [interaction]: SlashCommandContext,
        @Options() { amountToPayout }: PayoutDto,
    ): Promise<InteractionResponse<boolean>> {
        try {
            await changeLanguage(interaction.locale);

            const payouts = this.payoutService.calculatePayout(amountToPayout);

            return await interaction.reply({
                content: t('replies:commands.payout.successful', {
                    fiftyPercent: payouts.fiftyPercent,
                    thirtyPercent: payouts.thirtyPercent,
                    twentyPercent: payouts.twentyPercent,
                    remaining: payouts.remaining,
                }),
                ephemeral: true,
            });
        } catch (error) {
            this.logger.error('Payout could not be calculated: ', error);

            return await interaction.reply({
                content: t('replies:unknownError'),
                ephemeral: true,
            });
        }
    }
}
