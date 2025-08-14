import { FC } from "react";

import { useExtensionTranslation } from "../../../hooks/useExtensionTranslation";
import { BookmarkedItem } from "../../../types";
import Button from "../../ui/button";
import Card from "../../ui/card";

interface BookmarksTabCardProps {
  item: BookmarkedItem & { text: string };
  onRemoveBookmark: (id: string) => void;
}

const BookmarksTabCard: FC<BookmarksTabCardProps> = ({
  item,
  onRemoveBookmark,
}) => {
  const formatDate = (dateString: string) => {
    console.log(dateString, "data string:");
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return t("card.invalid_date");

    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t("card.today");
    if (diffDays === 1) return t("card.yesterday");
    if (diffDays < 7) return t("card.days_ago", { count: diffDays });
    return date.toLocaleDateString();
  };

  const { t } = useExtensionTranslation();
  console.log('item.type ',item )
  return (
    <Card
      title={
        <div className="flex items-center justify-between space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded text-white ${
              item.type === "dua"
                ? "bg-[var(--islamic-gold)]"
                : "bg-[var(--islamic-green)]"
            }`}
          >
            {t(`card.${item.type}`)}
          </span>
          <span>{item.title}</span>

          <div
            className="text-xs text-gray-500"
            data-testid={`text-date-${item.id}`}
          >
            {t("card.bookmarked")}: {formatDate(item.dateBookmarked!)}
          </div>
        </div>
      }
      headerActions={
        <Button
          className="transition-colors text-gray-400 hover:text-[var(--islamic-gold)]"
          title="Toggle Bookmark"
          onClick={() => onRemoveBookmark(item.id)}
        >
          <span className="mdi mdi-trash-can text-lg text-red-500" />
        </Button>
      }
    >
      <div
        className="font-arabic mb-3 p-3 bg-gray-50 rounded-lg border-r-4 border-[var(--islamic-green)]"
        style={{ lineHeight: 1.8, color: "hsl(208, 13%, 24%)" }}
      >
        {item.text}
      </div>
    </Card>
  );
};

export default BookmarksTabCard;
