import { useState, useEffect, useMemo, FC } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { BookmarkedItem, Chapter, SelectOption, Verse } from "../../types";
import chapters from "../../data/chapters/chapters.json";
import { searchVerses } from "../../utils/search-verse";
import VerseCard from "./verse-card/verse-card";
import Pagination from "../ui/pagination";
import Select from "../ui/select";

interface VerseTab {
   onToggleBookmark: (item: BookmarkedItem) => void;
    isBookmarked: (id: string) => boolean;
}

const VerseTab:FC<VerseTab> = ({isBookmarked,onToggleBookmark}) => {
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

      <div className="space-y-3">
        {paginatedData.map((verse) => (
          <VerseCard key={`${verse.chapter}-${verse.verse}`} verse={verse} onToggleBookmark={onToggleBookmark} isBookmarked={isBookmarked} />
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
