import { NumberOption } from 'necord';

export class SeedDto {
    // NumberOption decorator to define the numberOfGroups property
    @NumberOption({
        name: 'groups',
        name_localizations: {
            de: 'gruppen',
        },
        description: 'Number of groups to create',
        description_localizations: {
            de: 'Anzahl der Gruppen, die erstellt werden sollen.',
        },
        min_value: 1,
        required: true,
    })
    public numberOfGroups!: number;
}
