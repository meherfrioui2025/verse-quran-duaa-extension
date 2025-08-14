import { useState, useEffect, FC } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { BookmarkedItem, DuaCategory, FavoriteItem } from "../../types";
import ar from "../../data/duaa/duaa-ar.json";
import en from "../../data/duaa/duaa-en.json";
import fr from "../../data/duaa/duaa-fr.json";
import { DuaCard } from "./duaa-card/duaa";
import Pagination from "../ui/pagination";
import Category from "./category";
import Select from "../ui/select";

const translations = { ar, en, fr };

interface DuaaTabProps {
  onToggleBookmark: (item: BookmarkedItem) => void;
  isBookmarked: (id: string) => boolean;
  onToggleFavorites: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

const DuaaTab: FC<DuaaTabProps> = ({
  onToggleBookmark,
  isBookmarked,
  onToggleFavorites,
  isFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<DuaCategory>("morning");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { t, currentLanguage } = useExtensionTranslation();

  const categories = [
    { id: "morning" as DuaCategory, label: t("category.morning") },
    { id: "evening" as DuaCategory, label: t("category.evening") },
    { id: "prayer" as DuaCategory, label: t("category.prayer") },
    { id: "protection" as DuaCategory, label: t("category.protection") },
    { id: "healing" as DuaCategory, label: t("category.healing") },
    { id: "forgiveness" as DuaCategory, label: t("category.forgiveness") },
    { id: "gratitude" as DuaCategory, label: t("category.gratitude") },
    { id: "sleeping" as DuaCategory, label: t("category.sleeping") },
  ];

  const data = translations[currentLanguage as keyof typeof translations] || en;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, selectedCategory, currentLanguage]);

  return (
    <div className="p-4 h-full custom-scroll overflow-y-auto fade-in">
      <div className="mb-4">
        <Category
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <div className="space-y-3">
        {paginatedData.map((dua) => (
          <DuaCard
            key={dua.id}
            dua={dua}
            onToggleBookmark={onToggleBookmark}
            isBookmarked={isBookmarked}
            onToggleFavorites={onToggleFavorites}
            isFavorite={isFavorite}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          t={t}
        />
        <Select
          value={itemsPerPage}
          onChange={(value) => setItemsPerPage(Number(value))}
          options={[
            { label: "5", value: 5 },
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
          ]}
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
        />
      </div>
    </div>
  );
};

export default DuaaTab;
