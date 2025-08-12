import { Dua } from "../../../types";
import Button from "../../ui/button";
import Card from "../../ui/card";

interface DuaCardProps {
  dua: Dua;
}

export const DuaCard: React.FC<DuaCardProps> = ({ dua }) => {
  return (
    <Card
      title={<span>{dua.title}</span>}
      headerActions={
        <>
          <Button className="transition-colors text-gray-400 hover:text-[var(--islamic-gold)]">
            <span className={"mdi mdi-star text-lg"} />
          </Button>

          <Button className="bookmark-btn text-gray-400 hover:text-[var(--islamic-gold)]">
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
