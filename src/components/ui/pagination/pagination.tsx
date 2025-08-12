import { FC } from "react";
import Button from "../button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  t: (key: string) => string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  t,
}) => {
  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        {t("pagination.prev")}
      </Button>
      <span className="text-sm">
      {t("pagination.page")} {currentPage} {t("pagination.of")} {totalPages}
      </span>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        {t("pagination.next")}
      </Button>
    </div>
  );
};

export default Pagination;
