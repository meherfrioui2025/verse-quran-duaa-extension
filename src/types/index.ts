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

export interface Settings {
  notifications: boolean;
  notificationSettings: NotificationSettings;
  prayerSettings: PrayerSettings;
}

export interface NotificationSettings {
  enabled: boolean;
  startTime: string;
  endTime: string;
  interval: number;
  displayDuration: number;
  pauseDuringWork: boolean;
  workStartTime: string;
  workEndTime: string;
  pauseDuringPrayer: boolean;
  contentType: "both" | "quran" | "duas";
  dailyVerse: boolean;
  prayerReminders: boolean;
  tenSecondReminders: boolean;
}

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}

export interface PrayerSettings {
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  } | null;
  calculationMethod: "MWL" | "ISNA" | "Egypt" | "Makkah" | "Karachi";
  notifications: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  reminderMinutes: number;
  adhanEnabled: boolean;
  alerts: boolean;
  alertMinutes: number;
  audioAlert: boolean;
}
