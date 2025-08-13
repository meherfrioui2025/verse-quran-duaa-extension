import { useState, type FC } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import BookmarksTabCard from "./bookmarks-tab-card";
import { BookmarkedItem } from "../../types";
import Button from "../ui/button";

interface BookmarksTabProps {
  bookmarks: BookmarkedItem[];
}

const BookmarksTab: FC<BookmarksTabProps> = ({ bookmarks }) => {
  const [filter, setFilter] = useState<"all" | "dua" | "verse">("all");
  const { t } = useExtensionTranslation();

  const filteredBookmarks = bookmarks.filter(
    (bookmark) => filter === "all" || bookmark.type === filter
  );

  return (
    <div className="p-4 h-full custom-scroll overflow-y-auto fade-in">
      <div className="mb-2">
        <div className="flex space-x-2 text-xs">
          {[
            { id: "all", label: t("filters.all") },
            { id: "dua", label: t("filters.dua") },
            { id: "verse", label: t("filters.verse") },
          ].map((filterOption) => (
            <Button
              key={filterOption.id}
              className={`px-3 py-1 rounded-full transition-colors ${
                filter === filterOption.id
                  ? "bg-[var(--islamic-green)] text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-[var(--islamic-green)] hover:text-white"
              }`}
              onClick={() =>
                setFilter(filterOption.id as "all" | "dua" | "verse")
              }
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredBookmarks.length > 0 ? (
        <div className="space-y-3">
          {filteredBookmarks.map((item) => (
            <BookmarksTabCard
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                type: item.type,
                text: item.title,
                lang: item.lang,
                dateBookmarked:item.dateBookmarked
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">{t("card.noBookmarks")}</p>
          <p className="text-xs mt-1">{t("card.saveFavorites")}</p>
        </div>
      )}
    </div>
  );
};

export default BookmarksTab;
