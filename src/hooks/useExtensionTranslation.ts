import { useTranslation } from "react-i18next";

import { language } from "../types";

export function useExtensionTranslation() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: language) => {
    i18n.changeLanguage(lng);
    chrome.storage.sync.set({ language: lng });
  };

  return { t, changeLanguage, currentLanguage: i18n.language };
}
