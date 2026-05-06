import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import FilterSelect from "./FilterSelect";

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
  pageSize,
  setPageSize,
  onPageChange,
  pageSizeOptions = [5, 10, 20, 50],
}) {
  if (totalItems === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="border-t border-base-300 bg-base-100 px-5 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-base-content/60">
            <span className="font-medium text-base-content">{startItem}</span>
            {" - "}
            <span className="font-medium text-base-content">{endItem}</span>
            {" / "}
            <span className="font-medium text-base-content">{totalItems}</span>
            {" kayıt"}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <FilterSelect
            value={pageSize}
            onChange={(value) => setPageSize(Number(value))}
            hideLabel
            dropdownDirection="up"
            className="w-32"
            options={pageSizeOptions.map((option) => ({
              label: `${option} kayıt`,
              value: option,
            }))}
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="flex xl:h-8 xl:w-8 2xl:h-10 2xl:h-10 items-center justify-center rounded-full border border-primary/20 bg-base-100 text-base-content/40 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            {pages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition ${page === currentPage
                  ? "border-primary bg-primary text-primary-content shadow-md shadow-primary/20"
                  : "border-primary/30 bg-base-100 text-base-content hover:border-primary hover:text-primary"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-base-100 text-base-content/60 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;