import de from './languages/de.translations';
import en from './languages/en.translations';
import { init } from 'i18next';

// Function to initialize the translator
export const initTranslator = async () => {
    await init({
        lng: 'en', // Set the default language to English
        fallbackLng: 'en', // Set the fallback language to English
        resources: {
            en, // Add the English translations
            de, // Add the German translations
        },
    });
};
