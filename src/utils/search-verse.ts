import { Verse } from "../types";

export const searchVerses = (query: string, verses: Verse[]): Verse[] => {
  if (!query.trim()) return verses;

  const lowercaseQuery = query.toLowerCase();

  return verses.filter((verse) => {
    const matchesText = verse.text.toLowerCase().includes(lowercaseQuery);
    const matchesTitle = verse.title.toLowerCase().includes(lowercaseQuery);
    const matchesChapterVerse = `${verse.chapter}:${verse.verse}`.includes(
      lowercaseQuery
    );

    return matchesText || matchesTitle || matchesChapterVerse;
  });
};
