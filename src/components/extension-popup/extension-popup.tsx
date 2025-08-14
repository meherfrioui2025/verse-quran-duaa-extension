import { useState } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { BookmarkedItem, FavoriteItem, language, TabType } from "../../types";
import useChromeStorage from "../../hooks/useChromeStorage";
import TabNavigation from "../tab-navigation";
import BookmarksTab from "../bookmarks-tab";
import Footer from "../footer/footer";
import VerseTab from "../verse-tab";
import DuaaTab from "../duaa-tab";
import Header from "../header";
import FavoritesTab from "../favorites-tab";

const ExtensionPopup = () => {
  const [activeTab, setActiveTab] = useState<TabType>("duas");

  const { currentLanguage } = useExtensionTranslation();

  const [bookmarks, setBookmarks] = useChromeStorage<BookmarkedItem[]>(
    "islamic-extension-bookmarks",
    []
  );

  const [favorites, setFavorites] = useChromeStorage<FavoriteItem[]>(
    "islamic-extension-favorites",
    []
  );

  const toggleBookmark = (item: BookmarkedItem) => {
    const exists = bookmarks.find(
      (b) => b.id === item.id && b.lang === currentLanguage
    );
    setBookmarks(
      exists
        ? bookmarks.filter(
            (b) => b.id !== item.id && b.lang === currentLanguage
          )
        : [
            ...bookmarks,
            {
              ...item,
              lang: currentLanguage as language,
              dateBookmarked: new Date().toISOString(),
            },
          ]
    );
  };

  const isBookmarked = (id: string) =>
    bookmarks.some(
      (bookmark) => bookmark.id === id && bookmark.lang === currentLanguage
    );

  const onRemoveBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const toggleFavorites = (item: FavoriteItem) => {
    const exists = favorites.find(
      (b) => b.id === item.id && b.lang === currentLanguage
    );
    setFavorites(
      exists
        ? favorites.filter(
            (b) => b.id !== item.id && b.lang === currentLanguage
          )
        : [
            ...favorites,
            {
              ...item,
              lang: currentLanguage as language,
              dateFavorite: new Date().toISOString(),
            },
          ]
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id: string) =>
    favorites.some(
      (favorite) => favorite.id === id && favorite.lang === currentLanguage
    );

  return (
    <div className="h-full flex flex-col bg-white w-lg">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="overflow-y-auto max-h-96 h-fit p-2">
        {activeTab === "duas" && (
          <DuaaTab
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            onToggleFavorites={toggleFavorites}
            isFavorite={isFavorite}
          />
        )}
        {activeTab === "verses" && (
          <VerseTab
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            onToggleFavorites={toggleFavorites}
            isFavorite={isFavorite}
          />
        )}
        {activeTab === "bookmarks" && (
          <BookmarksTab
            bookmarks={bookmarks.filter(
              (item) => item.lang === currentLanguage
            )}
            onRemoveBookmark={onRemoveBookmark}
          />
        )}
        {activeTab === "favorites" && (
          <FavoritesTab
            favorites={favorites.filter(
              (item) => item.lang === currentLanguage
            )}
            onRemoveFavorite={removeFavorite}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ExtensionPopup;
