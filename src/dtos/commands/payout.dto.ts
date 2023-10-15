import { NumberOption } from 'necord';

export class PayoutDto {
    @NumberOption({
        name: 'amount',
        name_localizations: {
            de: 'betrag',
        },
        description: 'Amounts to payout',
        description_localizations: {
            de: 'Werte, die ausgezahlt werden sollen.',
        },
        min_value: 1,
        required: true,
    })
    public amountToPayout!: number;
}
