const createRange = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

export const usePagination = ({ totalPage, currentPage, siblingCount = 2 }) => {
  const DOTS = '...';
  const hasPagination = true;
  let range = [];

  if (totalPage <= 1) return { hasPagination: false, range };

  if (totalPage <= 10) return { hasPagination, range: createRange(1, totalPage) };

  // if totalPage > 10
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPage;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    range = [...createRange(1, leftItemCount), DOTS, totalPage];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    range = [firstPageIndex, DOTS, ...createRange(totalPage - rightItemCount + 1, totalPage)];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
    range = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return { hasPagination, range };
};