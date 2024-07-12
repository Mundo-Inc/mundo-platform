import { type Updater } from "@tanstack/react-table";
import { type ComponentProps, useMemo } from "react";

import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextButton,
  PaginationPreviousButton,
} from "./ui/pagination";

type DataTablePaginationProps = ComponentProps<"nav"> & {
  pageIndex: number;
  setPageIndex: (updater: Updater<number>) => void;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
};

export default function DataTablePagination({
  pageIndex,
  setPageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  ...props
}: DataTablePaginationProps) {
  const fewPagesComponent = useMemo(() => {
    if (pageCount <= 4) {
      const items = Array.from({ length: pageCount - 1 }, (_, i) => i + 1);

      return items.map((item) => (
        <PaginationItem key={item}>
          <PaginationButton
            isActive={pageIndex === item}
            onClick={() => setPageIndex(item)}
          >
            {item + 1}
          </PaginationButton>
        </PaginationItem>
      ));
    } else {
      return undefined;
    }
  }, [pageCount, pageIndex, setPageIndex]);

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousButton
            disabled={!canPreviousPage}
            onClick={previousPage}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            isActive={pageIndex === 0}
            onClick={() => setPageIndex(0)}
          >
            1
          </PaginationButton>
        </PaginationItem>

        {fewPagesComponent ? (
          fewPagesComponent
        ) : (
          <>
            {pageIndex < 3 ? (
              <PaginationItem>
                <PaginationButton
                  isActive={pageIndex === 1}
                  onClick={() => setPageIndex(1)}
                >
                  2
                </PaginationButton>
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {pageIndex < 3 ? (
              <PaginationItem>
                <PaginationButton
                  isActive={pageIndex === 2}
                  onClick={() => setPageIndex(2)}
                >
                  3
                </PaginationButton>
              </PaginationItem>
            ) : pageIndex < pageCount - 2 ? (
              <PaginationItem>
                <PaginationButton
                  isActive
                  onClick={() => setPageIndex(pageIndex)}
                >
                  {pageIndex + 1}
                </PaginationButton>
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationButton
                  isActive={pageIndex === pageCount - 3}
                  onClick={() => setPageIndex(pageCount - 3)}
                >
                  {pageCount - 2}
                </PaginationButton>
              </PaginationItem>
            )}

            {pageIndex >= pageCount - 3 ? (
              <PaginationItem>
                <PaginationButton
                  isActive={pageIndex === pageCount - 2}
                  onClick={() => setPageIndex(pageCount - 2)}
                >
                  {pageCount - 1}
                </PaginationButton>
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationButton
                isActive={pageIndex === pageCount - 1}
                onClick={() => setPageIndex(pageCount - 1)}
              >
                {pageCount}
              </PaginationButton>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNextButton
            disabled={!canNextPage}
            onClick={() => nextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
