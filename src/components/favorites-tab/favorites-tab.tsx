import { FC, useState } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { FavoriteItem } from "../../types";
import Button from "../ui/button";

interface FavoritesProps {
  favorites: FavoriteItem[];
  onRemoveFavorite: (id: string) => void;
}

const FavoritesTab: FC<FavoritesProps> = ({ favorites, onRemoveFavorite }) => {
  const [activeTab, setActiveTab] = useState<"favorites" | "personal">(
    "favorites"
  );
  const { t } = useExtensionTranslation();
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

      <div className="flex-1 overflow-y-auto">
        {activeTab === "favorites" && (
          <div className="space-y-3 p-4">
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <span className="mdi mdi-heart w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No favorites yet</p>
                <p className="text-gray-400 text-xs mt-1">
                  Bookmark verses and duas from other tabs
                </p>
              </div>
            ) : (
              favorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 flex items-center gap-4">
                      <h3 className="font-medium text-gray-800 text-sm">
                        {item.title}
                      </h3>
                      <div
                        className={`text-white bg-[var(${
                          item.type === "verse"
                            ? "--islamic-green"
                            : "--islamic-gold"
                        })] rounded-md w-fit px-2`}
                      >
                        {item.type}
                      </div>
                    </div>
                    <Button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <span className="mdi mdi-trash-can text-red-500 text-lg" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 italic">
                      {item.text}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesTab;
