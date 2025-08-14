import { FC } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import Select from "../ui/select";
import { language } from "../../types";

const Header: FC = () => {
  const { t, currentLanguage, changeLanguage } = useExtensionTranslation();

  return (
    <div className="gradient-islamic text-white p-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative flex items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-white h-10 w-10 rounded-full flex items-center justify-center">
              <span className="mdi mdi-moon-waxing-crescent text-2xl text-green-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                {t("appName")}
              </h1>
              <p className="text-sm text-white/80 font-medium">
                {t("daily_guidance_prayers")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={currentLanguage}
            onChange={(value) => changeLanguage(value as language)}
            className="appearance-none border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer pr-8"
            options={[
              { label: `🇺🇸 ${t("language.en")}`, value: "en" },
              { label: `🇫🇷 ${t("language.fr")}`, value: "fr" },
              { label: `🇸🇦 ${t("language.ar")}`, value: "ar" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
