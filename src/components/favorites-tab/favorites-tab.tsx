import { FC, useState } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import Button from "../ui/button";

const FavoritesTab: FC = () => {
  const [activeTab, setActiveTab] = useState<"favorites" | "personal">(
    "favorites"
  );
  const { t } = useExtensionTranslation();
  const favorites = [];
  const personalDuas = [];
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          {t("favorites.favorites")}
        </h2>
      </div>

      <div className="flex border-b border-gray-200">
        <Button
          onClick={() => setActiveTab("favorites")}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "favorites"
              ? "text-[var(--islamic-green)] border-b-2 border-[var(--islamic-green)]"
              : "text-gray-600 hover:text-gray-800"
          }`}
          data-testid="tab-favorites"
        >
          {t("favorites.favorites")} ({favorites.length})
        </Button>
        <Button
          onClick={() => setActiveTab("personal")}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "personal"
              ? "text-[var(--islamic-green)] border-b-2 border-[var(--islamic-green)]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {t("favorites.personal_duas")} ({personalDuas.length})
        </Button>
      </div>
    </div>
  );
};

export default FavoritesTab;
