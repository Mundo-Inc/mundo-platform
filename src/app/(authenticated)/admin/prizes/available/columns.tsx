import { CopyIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { IPrize } from "@/interfaces/Prize";
import { copyCellValueToClipboard } from "@/lib/tables";

const numberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  compactDisplay: "short",
});

export const columns: ColumnDef<IPrize>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ cell }) => {
      return (
        <Avatar className="rounded-sm">
          <AvatarImage src={cell.getValue() as string} />
          <AvatarFallback>
            {cell.row.original.title.charAt(0) || "-"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ cell }) => {
      return (
        <span className="font-mono">
          {numberFormatter.format(cell.getValue() as number)}
        </span>
      );
    },
  },
  {
    accessorKey: "count",
    header: "Count (Remaining)",
  },
  {
    accessorKey: "_id",
    header: "ID",
    size: 100,
    cell: ({ cell }) => {
      return (
        <Button
          id={cell.getValue() as string}
          size="icon"
          variant="outline"
          className="p-0"
          onClick={copyCellValueToClipboard.bind(null, cell)}
        >
          <CopyIcon className="size-4" />
        </Button>
      );
    },
  },
];
