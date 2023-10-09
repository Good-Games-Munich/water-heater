import { NumberOption } from 'necord';

export class SeedDto {
    @NumberOption({
        name: 'groups',
        description: 'Number of groups to create',
        min_value: 1,
        required: true,
    })
    public numberOfGroups!: number;
}
