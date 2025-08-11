import { FC } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";

import { TabType } from "../../types";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useExtensionTranslation();

  const tabs = [
    { id: "duas" as TabType, label: t("tabs.duas"), icon: "mdi-hand-heart" },
    {
      id: "verses" as TabType,
      label: t("tabs.verses"),
      icon: "mdi-book-open-variant",
    },
    { id: "prayer" as TabType, label: t("tabs.prayer"), icon: "mdi-clock" },
    {
      id: "favorites" as TabType,
      label: t("tabs.favorites"),
      icon: "mdi-star",
    },
    {
      id: "bookmarks" as TabType,
      label: t("tabs.bookmarks"),
      icon: "mdi-bookmark",
    },
    {
      id: "settings" as TabType,
      label: t("tabs.settings"),
      icon: "mdi-cog-outline",
    },
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`cursor-pointer h-10 flex-1 flex items-center justify-center gap-0.5 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "border-b-2 border-[var(--islamic-green)] text-white bg-[var(--islamic-green)]"
                    : "text-gray-500 hover:text-[var(--islamic-green)]"
                }`}
            >
              <span className={`mdi ${tab.icon} text-base`} />
              <span> {tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
