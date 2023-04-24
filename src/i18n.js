import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './translations/vi';
import en from './translations/en';
// Cấu hình i18next
i18n
  .use(initReactI18next) // Hook cho React
  .init({
    // Cấu hình ngôn ngữ, nguồn dữ liệu,...
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng
    resources: {
      vi: {
        translation: vi
      },
      en: {
        translation: en
      },
     
    },
  });

export default i18n;
