import { createCommandGroupDecorator } from 'necord';

export const WeeklyDecorator = createCommandGroupDecorator({
    name: 'weekly', // Set the name of the command group
    description: 'Commands for the weekly event', // Set the description of the command group
    descriptionLocalizations: {
        de: 'Befehle für das weekly', // Set the localized description of the command group
    },
});
