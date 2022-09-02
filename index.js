/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import translationEN from './public/en/translation.json';
import translationUA from './public/ua/translation.json';
import translationRU from './public/ru/translation.json';
import axios from "axios";

const MAIN_URL = "http://localhost";

axios.post(MAIN_URL + "/language")
  .then(res => {
    const data = res.data;
    console.log('EEElanguagdatae', data)

  }).catch(error => error);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translationEN
      },
      uk: {
        translation: translationUA
      },
      ru: {
        translation: translationRU
      }
    },
    supportedLngs: ["en", 'ru', 'uk'],
    fallbackLng: "ru",
    // loadPath: `${API_BASE_URL}/xyzzzzzzz/{{lng}}`
    backend: {
      loadPath: '/{{lng}}/translation.json',
    },
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    // interpolation: {
    //   escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    // }
  })

AppRegistry.registerComponent(appName, () => App);

