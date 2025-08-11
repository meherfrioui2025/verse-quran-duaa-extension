import { FC } from "react";
import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";

const Header: FC = () => {
  const { t, currentLanguage, changeLanguage } = useExtensionTranslation();

  return (
    <div className="gradient-islamic text-white p-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative flex items-center justify-between">
        <div className="flex items-center justify-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              {t("islamic_companion")}
            </h1>
            <p className="text-sm text-white/80 font-medium">
              {t("daily_guidance_prayers")}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="appearance-none border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer pr-8"
          >
            <option value="en">🇺🇸 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
