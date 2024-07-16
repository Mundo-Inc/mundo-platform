import { CopyIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { IPrizeRedemption } from "@/interfaces/redemption";
import { copyCellValueToClipboard } from "@/lib/tables";

const numberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  compactDisplay: "short",
});

export const columns: ColumnDef<IPrizeRedemption>[] = [
  {
    accessorKey: "userId.name",
    header: "Name",
  },
  {
    accessorKey: "userId.username",
    header: "Username",
  },
  {
    accessorKey: "userId.email.address",
    header: "Email",
  },
  {
    accessorKey: "prizeId.title",
    header: "Prize Title",
  },
  {
    accessorKey: "prizeId.amount",
    header: "Amount",
  },
  {
    accessorKey: "prizeId.count",
    header: "Count (Remaining)",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    size: 100,
    cell: ({ cell }) => {
      return (
        <span>{new Date(cell.getValue() as string).toLocaleDateString()}</span>
      );
    },
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
