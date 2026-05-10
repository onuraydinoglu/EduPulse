import { useEffect, useMemo, useState } from "react";

export function usePagination(items = [], initialPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(initialPageSize);

  const safeItems = Array.isArray(items) ? items : [];

  const totalItems = safeItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSizeState));

  useEffect(() => {
    setCurrentPage((prevPage) => {
      if (prevPage > totalPages) return totalPages;
      if (prevPage < 1) return 1;
      return prevPage;
    });
  }, [totalPages]);

  const setPageSize = (value) => {
    const nextPageSize = Number(value) || initialPageSize;

    setPageSizeState(nextPageSize);
    setCurrentPage(1);
  };

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSizeState;
    const endIndex = startIndex + pageSizeState;

    return safeItems.slice(startIndex, endIndex);
  }, [safeItems, currentPage, pageSizeState]);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSizeState + 1;
  const endItem = Math.min(currentPage * pageSizeState, totalItems);

  const goPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return {
    currentPage,
    totalPages,
    pageSize: pageSizeState,
    paginatedItems,
    totalItems,
    startItem,
    endItem,
    setCurrentPage,
    setPageSize,
    goPrevious,
    goNext,
  };
}

export default usePagination;