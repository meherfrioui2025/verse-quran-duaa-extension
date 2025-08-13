import { useState } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { BookmarkedItem, language, TabType } from "../../types";
import useChromeStorage from "../../hooks/useChromeStorage";
import TabNavigation from "../tab-navigation";
import Footer from "../footer/footer";
import VerseTab from "../verse-tab";
import DuaaTab from "../duaa-tab";
import Header from "../header";

const ExtensionPopup = () => {
  const [activeTab, setActiveTab] = useState<TabType>("duas");

  const { currentLanguage } = useExtensionTranslation();

  const [bookmarks, setBookmarks] = useChromeStorage<BookmarkedItem[]>(
    "islamic-extension-bookmarks",
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

  console.log("bookmarks", bookmarks);

  return (
    <div className="h-full flex flex-col bg-white w-lg">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="overflow-y-auto max-h-96 h-fit p-2">
        {activeTab === "duas" && <DuaaTab onToggleBookmark={toggleBookmark} />}
        {activeTab === "verses" && <VerseTab />}
      </div>
      <Footer />
    </div>
  );
};

export default ExtensionPopup;
