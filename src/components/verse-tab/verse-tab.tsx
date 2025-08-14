import { useState, useEffect, useMemo, FC } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { getDailyVerse } from "../../utils/getDailyVerses";
import chapters from "../../data/chapters/chapters.json";
import { searchVerses } from "../../utils/search-verse";
import VerseCard from "./verse-card/verse-card";
import Pagination from "../ui/pagination";
import Select from "../ui/select";
import {
  BookmarkedItem,
  Chapter,
  FavoriteItem,
  language,
  SelectOption,
  Verse,
} from "../../types";

interface VerseTab {
  onToggleBookmark: (item: BookmarkedItem) => void;
  isBookmarked: (id: string) => boolean;
  onToggleFavorites: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

const VerseTab: FC<VerseTab> = ({
  isBookmarked,
  onToggleBookmark,
  isFavorite,
  onToggleFavorites,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [data, setData] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { t, currentLanguage } = useExtensionTranslation();

  const loadVerses = async (lang: string): Promise<Verse[]> => {
    const module = await import(`../../data/quran/${lang}.json`);
    const rawDataObj = module.default as Record<string, Omit<Verse, "title">[]>;
    const rawData = Object.values(rawDataObj).flat();

    return rawData.map((verse) => {
      const chapterInfo = (chapters as Chapter[]).find(
        (ch) => ch.id === verse.chapter
      );
      let title = "";
      if (chapterInfo) {
        if (lang === "ar") title = chapterInfo.name;
        else if (lang === "fr") title = chapterInfo.name_fr;
        else title = chapterInfo.name_en;
      }
      return { ...verse, title };
    });
  };

  useEffect(() => {
    setLoading(true);
    loadVerses(currentLanguage)
      .then(setData)
      .finally(() => setLoading(false));
  }, [currentLanguage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, searchQuery]);

  const filteredData = searchVerses(searchQuery, data);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const itemsPerPageOptions: SelectOption[] = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
  ];

  const dailyVerse = getDailyVerse(data);
  if (loading) {
    return <div className="p-4">{t("loading")}</div>;
  }

  return (
    <div className="p-4 h-full custom-scroll overflow-y-auto fade-in">
      <div className="relative flex-1 my-2">
        <input
          type="text"
          placeholder={t("search.searchVersesPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-[var(--islamic-green)] border-gray-300 text-sm shadow-sm bg-white"
        />
        <span className="mdi mdi-search-web absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
      </div>

      {!searchQuery && currentPage === 1 && (
        <div className="gradient-islamic text-white rounded-xl p-6 mb-6 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{t("card.vers_of_day")}</h3>
              <div className="flex items-center space-x-2">
                <button
                  className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300 ${
                    isBookmarked(String(dailyVerse.verse))
                      ? "bg-[var(--islamic-gold)] text-white"
                      : "bg-white/20 hover:bg-white/30 text-white hover:text-[var(--islamic-gold)]"
                  }`}
                  onClick={() =>
                    onToggleBookmark({
                      id: String(dailyVerse.verse),
                      title: dailyVerse.title,
                      text: dailyVerse.text,
                      type: "verse",
                      dateBookmarked: new Date().toISOString(),
                      lang: currentLanguage as language,
                    })
                  }
                >
                  <span
                    className={`mdi mdi-heart text-lg ${
                      isBookmarked(String(dailyVerse.verse))
                        ? "fill-current"
                        : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div
              className={`mb-4 text-white bg-white/10 p-4 rounded-lg backdrop-blur-sm`}
              style={{ lineHeight: 1.8 }}
            >
              {dailyVerse.text}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {paginatedData.map((verse) => (
          <VerseCard
            key={`${verse.chapter}-${verse.verse}`}
            verse={verse}
            onToggleBookmark={onToggleBookmark}
            isBookmarked={isBookmarked}
            onToggleFavorites={onToggleFavorites}
            isFavorite={isFavorite}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          t={t}
        />
        <Select
          value={itemsPerPage}
          onChange={(value) => setItemsPerPage(Number(value))}
          options={itemsPerPageOptions}
          className="border border-gray-300 rounded-lg px-2 text-sm bg-white"
        />
      </div>
    </div>
  );
};

export default VerseTab;
