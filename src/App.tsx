import { useExtensionTranslation } from "./hooks/useExtensionTranslation";
import ExtensionPopup from "./components/extension-popup";
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const { t, currentLanguage } = useExtensionTranslation();

  useEffect(() => {
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [currentLanguage]);

  return (
    <div>
      <ExtensionPopup />
      <p>{t("welcome_message")}</p>
    </div>
  );
}
