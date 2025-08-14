import { useExtensionTranslation } from "../../../hooks/useExtensionTranslation";
import { BookmarkedItem, FavoriteItem, language, Verse } from "../../../types";
import Button from "../../ui/button";
import Card from "../../ui/card";

export interface VerseCardProps {
  verse: Verse;
  onToggleBookmark: (item: BookmarkedItem) => void;
  isBookmarked: (id: string) => boolean;
  onToggleFavorites: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  isBookmarked,
  onToggleBookmark,
  isFavorite,
  onToggleFavorites,
}) => {
  const { currentLanguage } = useExtensionTranslation();
  return (
    <Card
      title={
        <span>
          {verse.title}:{verse.verse}
        </span>
      }
      headerActions={
        <>
          <Button
            className={`${
              isFavorite(String(verse.verse))
                ? "text-[var(--islamic-gold)] active"
                : "text-gray-400 hover:text-[var(--islamic-gold)]"
            }`}
            onClick={() =>
              onToggleFavorites({
                id: String(verse.verse),
                title: verse.title,
                text: verse.text,
                type: "verse",
                dateFavorite: new Date().toISOString(),
                lang: currentLanguage as language,
              })
            }
          >
            <span className={"mdi mdi-star text-lg"} />
          </Button>

          <Button
            className={`bookmark-btn ${
              isBookmarked(String(verse.verse))
                ? "text-[var(--islamic-gold)] active"
                : "text-gray-400 hover:text-[var(--islamic-gold)]"
            }`}
            onClick={() =>
              onToggleBookmark({
                id: String(verse.verse),
                title: verse.title,
                text: verse.text,
                type: "verse",
                dateBookmarked: new Date().toISOString(),
                lang: currentLanguage as language,
              })
            }
          >
            <span className={"mdi mdi-heart text-lg"} />
          </Button>
        </>
      }
    >
      <div
        className={`font-arabic mb-3 p-3 bg-gray-50 rounded-lg border-r-4 border-[var(--islamic-green)]`}
        style={{ lineHeight: 1.8, color: "hsl(208, 13%, 24%)" }}
      >
        {verse.text}
      </div>
    </Card>
  );
};

export default VerseCard;
