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
  text: string;
  title: string;
}

export type Verse = {
  chapter: number;
  verse: number;
  text: string;
  title: string;
};

export interface Chapter {
  id: number;
  name: string;
  name_en: string;
  name_fr: string;
}

export interface SelectOption {
  label: string;
  value: number;
}

export type language = "en" | "fr" | "ar";

export interface BookmarkedItem {
  id: string;
  type: "dua" | "verse";
  title: string;
  text: string;
  dateBookmarked?: string;
  lang: language;
}

export interface FavoriteItem {
  id: string;
  type: "dua" | "verse";
  title: string;
  text: string;
  dateFavorite?: string;
  lang: language;
}
