import { useState } from "react";
import { DuaCategory } from "../../types";
import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import Category from "./category";
import { DuaCard } from "./duaa-card/duaa";

const DuaaTab = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<DuaCategory>("morning");

  const { t } = useExtensionTranslation();

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

  const filteredDuas = [
    {
      id: "dua1",
      title: "Morning Dua",
      arabic: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلا أَنْتَ...",
      transliteration: "Allahumma anta rabbee la ilaha illa anta...",
      translation: "O Allah, You are my Lord, there is no deity except You...",
      translationFr:
        "Ô Allah, Tu es mon Seigneur, il n'y a de divinité que Toi...",
      
      category: "morning" as DuaCategory,
    },
    {
      id: "dua2",
      title: "Evening Dua",
      arabic: "أَمْسَيْـنا وَأَمْسـى المـلكُ لله...",
      transliteration: "Amsayna wa amsal mulku lillah...",
      translation:
        "We have entered the evening and the kingdom belongs to Allah...",
      translationFr:
        "Nous sommes entrés dans la soirée et le royaume appartient à Allah...",
      
      category: "evening" as DuaCategory,
    },
    {
      id: "dua3",
      title: "Prayer Opening Dua",
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ...",
      transliteration: "Subhanaka Allahumma wa bihamdik...",
      translation: "Glory is to You, O Allah, and praise...",
      translationFr: "Gloire à Toi, ô Allah, et louange...",
      category: "prayer" as DuaCategory,
    },
  ];

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
        {filteredDuas.map((dua) => (
          <DuaCard
            key={dua.id}
            dua={dua}
            isFavorite={() => false}
            toggleFavorite={() => {}}
            isBookmarked={() => false}
            handleToggleBookmark={() => {}}
            getTextSizeClass={() => ""}
            settings={{ language: "" }}
            handleAudioPlay={() => {}}
            handleCopyText={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default DuaaTab;
