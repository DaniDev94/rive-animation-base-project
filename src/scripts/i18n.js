import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const loadPath = '../../assets/locales/{{lng}}/{{ns}}.json';

i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: loadPath
        }
    });

export default i18next;
