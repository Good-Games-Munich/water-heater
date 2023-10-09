import messagesTranslations from './messages.translations';
import { init } from 'i18next';

export const initTranslator = async () => {
    await init({
        lng: 'en',
        fallbackLng: 'en',
        resources: messagesTranslations,
    });
};
