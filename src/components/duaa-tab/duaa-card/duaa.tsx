import { Dua } from "../../../types";
import Card from "../../ui/card";

interface DuaCardProps {
  dua: Dua;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (...args: any[]) => void;
  isBookmarked: (id: string) => boolean;
  handleToggleBookmark: (dua: Dua) => void;
  getTextSizeClass: () => string;
  settings: { language: string };
  handleAudioPlay: () => void;
  handleCopyText: (dua: Dua) => void;
}

export const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  isFavorite,
  toggleFavorite,
  isBookmarked,
  handleToggleBookmark,
  getTextSizeClass,
}) => {
  return (
    <Card
      title={<span>{dua.title}</span>}
      headerActions={
        <>
          <button
            className={`transition-colors ${
              isFavorite(dua.id)
                ? "text-islamic-gold"
                : "text-gray-400 hover:text-islamic-gold"
            }`}
            onClick={() =>
              toggleFavorite(
                dua.id,
                "dua",
                dua.title,
                dua.arabic.substring(0, 50) + "...",
                dua.arabic,
                dua.translation
              )
            }
          >
            <span className={"mdi mdi-star"} />
          </button>

          <button
            className={`bookmark-btn ${
              isBookmarked(dua.id)
                ? "text-islamic-gold active"
                : "text-gray-400 hover:text-islamic-gold"
            }`}
            onClick={() => handleToggleBookmark(dua)}
          >
            <span
              className={`mdi mdi-heart w-4 h-4 ${
                isBookmarked(dua.id) ? "fill-current" : ""
              }`}
            />
          </button>
        </>
      }
    >
      <div
        className={`rtl font-arabic mb-3 p-3 bg-gray-50 rounded-lg border-r-4 border-islamic-green ${getTextSizeClass()}`}
        style={{ lineHeight: 1.8, color: "hsl(208, 13%, 24%)" }}
      >
        {dua.arabic}
      </div>

      <div className="text-sm text-gray-600 mb-2 italic">
        {dua.transliteration}
      </div>
    </Card>
  );
};
