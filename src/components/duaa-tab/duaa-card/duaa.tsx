import { useExtensionTranslation } from "../../../hooks/useExtensionTranslation";
import { BookmarkedItem, Dua, FavoriteItem, language } from "../../../types";
import Button from "../../ui/button";
import Card from "../../ui/card";

interface DuaCardProps {
  dua: Dua;
  onToggleBookmark: (item: BookmarkedItem) => void;
  isBookmarked: (id: string) => boolean;
  onToggleFavorites: (item: FavoriteItem) => void;
  isFavorite: (i: string) => boolean;
}

export const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  onToggleBookmark,
  isBookmarked,
  onToggleFavorites,
  isFavorite,
}) => {
  const { currentLanguage } = useExtensionTranslation();
  return (
    <Card
      title={<span>{dua.title}</span>}
      headerActions={
        <>
          <Button
            className={`transition-colors cursor-pointer ${
              isFavorite(dua.id)
                ? "text-[var(--islamic-gold)]"
                : "text-gray-400 hover:text-[var(--islamic-gold)]"
            }`}
          >
            <span
              className={"mdi mdi-star text-lg"}
              onClick={() =>
                onToggleFavorites({
                  id: dua.id,
                  title: dua.title,
                  text: dua.text,
                  type: "dua",
                  dateFavorite: new Date().toISOString(),
                  lang: currentLanguage as language,
                })
              }
            />
          </Button>

          <Button
            className={`bookmark-btn ${
              isBookmarked(dua.id)
                ? "text-[var(--islamic-gold)] active"
                : "text-gray-400 hover:text-[var(--islamic-gold)]"
            }`}
            onClick={() =>
              onToggleBookmark({
                id: dua.id,
                title: dua.title,
                text: dua.text,
                type: "dua",
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
        {dua.text}
      </div>
    </Card>
  );
};
