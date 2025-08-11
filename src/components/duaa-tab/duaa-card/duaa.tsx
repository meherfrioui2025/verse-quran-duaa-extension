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
  settings,
  handleAudioPlay,
  handleCopyText,
}) => {
  return (
    <Card
      title={<span data-testid={`text-dua-title-${dua.id}`}>{dua.title}</span>}
      headerActions={
        <>
          {/* Favorite Button */}
          <button
            className={`transition-colors ${
              isFavorite(dua.id)
                ? "text-islamic-gold"
                : "text-gray-400 hover:text-islamic-gold"
            }`}
            data-testid={`button-favorite-${dua.id}`}
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

          {/* Bookmark Button */}
          <button
            className={`bookmark-btn ${
              isBookmarked(dua.id)
                ? "text-islamic-gold active"
                : "text-gray-400 hover:text-islamic-gold"
            }`}
            onClick={() => handleToggleBookmark(dua)}
            data-testid={`button-bookmark-${dua.id}`}
          >
            <span
              className={`mdi mdi-heart w-4 h-4 ${
                isBookmarked(dua.id) ? "fill-current" : ""
              }`}
            />
          </button>
        </>
      }
      footer={
        <>
          <div className="flex space-x-3">
            <button
              className="audio-button text-white px-3 py-1 rounded-full text-xs transition-all duration-300"
              onClick={() => handleAudioPlay()}
              data-testid={`button-play-${dua.id}`}
            >
              listen
            </button>
            <button
              className="text-gray-500 hover:text-islamic-green px-2 py-1 rounded text-xs transition-colors"
              onClick={() => handleCopyText(dua)}
              data-testid={`button-copy-${dua.id}`}
            >
              Copy
            </button>
          </div>
          {dua.recitationCount && (
            <span
              className="text-xs text-gray-400"
              data-testid={`text-count-${dua.id}`}
            >
              {dua.recitationCount}
            </span>
          )}
        </>
      }
      data-testid={`card-dua-${dua.id}`}
    >
      {/* Arabic Text */}
      <div
        className={`rtl font-arabic mb-3 p-3 bg-gray-50 rounded-lg border-r-4 border-islamic-green ${getTextSizeClass()}`}
        style={{ lineHeight: 1.8, color: "hsl(208, 13%, 24%)" }}
        data-testid={`text-arabic-${dua.id}`}
      >
        {dua.arabic}
      </div>

      {/* Transliteration */}
      <div
        className="text-sm text-gray-600 mb-2 italic"
        data-testid={`text-transliteration-${dua.id}`}
      >
        {dua.transliteration}
      </div>

      {/* Translation */}
      <div
        className="text-sm text-gray-700"
        data-testid={`text-translation-${dua.id}`}
      >
        {settings.language === "fr" && dua.translationFr
          ? dua.translationFr
          : dua.translation}
      </div>
    </Card>
  );
};
