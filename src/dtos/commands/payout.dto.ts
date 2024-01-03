import { NumberOption } from 'necord';

export class PayoutDto {
    // NumberOption decorator to define the amountToPayout property
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
