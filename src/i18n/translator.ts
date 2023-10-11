import de from './languages/de.translations';
import en from './languages/en.translations';
import { init } from 'i18next';

export const initTranslator = async () => {
    await init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en,
            de,
        },
    });
};
