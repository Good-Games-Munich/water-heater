import { NumberOption } from 'necord';

export class PayoutDto {
    // NumberOption decorator to define the amountToPayout property
    @NumberOption({
        description: 'Amounts to payout',
        description_localizations: {
            de: 'Werte, die ausgezahlt werden sollen.',
        },
        min_value: 1,
        name: 'amount',
        name_localizations: {
            de: 'betrag',
        },
        required: true,
    })
    public amountToPayout!: number;
}
