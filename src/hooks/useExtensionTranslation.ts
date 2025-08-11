import { useTranslation } from "react-i18next";

export function useExtensionTranslation() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    chrome.storage.sync.set({ language: lng });
  };

  return { t, changeLanguage, currentLanguage: i18n.language };
}
