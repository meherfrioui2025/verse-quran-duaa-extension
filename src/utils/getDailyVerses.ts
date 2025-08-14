import { Verse } from "../types";

export const getDailyVerse = (verses: Array<Verse>): Verse => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
  return verses[dayOfYear % verses.length];
};
