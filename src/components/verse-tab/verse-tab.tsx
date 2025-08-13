import { useState, useEffect } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { Chapter, SelectOption, Verse } from "../../types";
import chapters from "../../data/chapters/chapters.json";
import VerseCard from "./verse-card/verse-card";
import Pagination from "../ui/pagination";
import Select from "../ui/select";

const VerseTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [data, setData] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  const { t, currentLanguage } = useExtensionTranslation();

  const loadVerses = async (lang: string): Promise<Verse[]> => {
    const module = await import(`../../data/quran/${lang}.json`);

    const rawDataObj = module.default as Record<string, Omit<Verse, "title">[]>;

    const rawData: Omit<Verse, "title">[] = Object.values(rawDataObj).flat();

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
  }, [itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="p-4">{t("loading")}</div>;
  }

  const itemsPerPageOptions: SelectOption[] = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
  ];

  return (
    <div className="p-4 h-full custom-scroll overflow-y-auto fade-in">
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="itemsPerPage" className="text-sm font-medium">
          {t("pagination.itemsPerPage")}
        </label>
        <Select
          value={itemsPerPage}
          onChange={(value) => setItemsPerPage(Number(value))}
          options={itemsPerPageOptions}
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
        />
      </div>

      <div className="space-y-3">
        {paginatedData.map((verse) => (
          <VerseCard key={`${verse.chapter}-${verse.text}`} verse={verse} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        t={t}
      />
    </div>
  );
};

export default VerseTab;
