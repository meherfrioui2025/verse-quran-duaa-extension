import { FC } from "react";
import { DuaCategory } from "../../../types";
import Button from "../../ui/button";

export type CategoryOption<> = {
  id: DuaCategory;
  label: string;
};

interface CategoryTabsProps {
  categories: Array<CategoryOption>;
  selected: string;
  onChange: (id: DuaCategory) => void;
  className?: string;
}

const Category: FC<CategoryTabsProps> = ({
  categories,
  selected,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-wrap gap-2 text-xs ${className}`}>
      {categories.map(({ id, label }) => {
        const isActive = selected === id;
        return (
          <Button
            key={id}
            className={`px-2 py-1 rounded-full transition-colors whitespace-nowrap ${
              isActive
                ? "bg-[var(--islamic-green)] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-[var(--islamic-green)] hover:text-white"
            }`}
            onClick={() => onChange(id)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default Category;
