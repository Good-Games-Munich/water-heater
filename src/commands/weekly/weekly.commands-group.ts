import { createCommandGroupDecorator } from 'necord';

export const WeeklyDecorator = createCommandGroupDecorator({
    name: 'weekly',
    description: 'Commands for the weekly event',
    descriptionLocalizations: {
        de: 'Befehle für das weekly',
    },
});
