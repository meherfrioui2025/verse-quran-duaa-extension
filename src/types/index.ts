export type TabType =
  | "duas"
  | "verses"
  | "bookmarks"
  | "favorites"
  | "prayer"
  | "settings";

export type DuaCategory =
  | "morning"
  | "evening"
  | "prayer"
  | "protection"
  | "healing"
  | "forgiveness"
  | "gratitude"
  | "sleeping";

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  translationFr?: string;
  category:
    | "morning"
    | "evening"
    | "prayer"
    | "general"
    | "protection"
    | "healing"
    | "forgiveness"
    | "gratitude"
    | "sleeping";
  recitationCount?: string;
  audioUrl?: string;
}
