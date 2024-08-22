import { CopyIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { type IAdminUser } from "@/interfaces/User";
import { copyCellValueToClipboard } from "@/lib/tables";

export const columns: ColumnDef<IAdminUser>[] = [
  {
    accessorKey: "profileImage",
    header: "Image",
    cell: ({ cell, row }) => {
      return (
        <Avatar>
          <AvatarImage src={cell.getValue() as string} />
          <AvatarFallback>{row.original.name.charAt(0) || "-"}</AvatarFallback>
        </Avatar>
      );
    },
    size: 50,
    maxSize: 50,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ cell }) => {
      return <span className="font-mono">{cell.getValue() as string}</span>;
    },
  },
  {
    accessorKey: "email.address",
    header: "Email",
    size: 800,
    cell: ({ cell }) => {
      return <span className="font-mono">{cell.getValue() as string}</span>;
    },
  },

  {
    accessorKey: "isPrivate",
    header: "Private",
    size: 50,
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
