import { useExtensionTranslation } from "./hooks/useExtensionTranslation";

export default function LanguageSwitcher() {
  const { t, changeLanguage, currentLanguage } = useExtensionTranslation();

  return (
    <div>
      <p>{t("welcome_message")}</p>
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}
