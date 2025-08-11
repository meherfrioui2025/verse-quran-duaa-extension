import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

const getStoredLang = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["language"], (result) => {
      resolve(result.language || "en");
    });
  });
};

const initI18n = async () => {
  const savedLang = await getStoredLang();

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: savedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

export default initI18n;
