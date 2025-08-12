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
  text: string;
  title: string;
}
