import { type IAdminUser } from "@/interfaces/User";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

export const columns: ColumnDef<IAdminUser>[] = [
  {
    accessorKey: "profileImage",
    header: "Profile Image",
    cell: ({ cell, row }) => {
      return (
        <Avatar>
          <AvatarImage src={cell.getValue() as string} />
          <AvatarFallback>{row.original.name.charAt(0) || "-"}</AvatarFallback>
        </Avatar>
      );
    },
    enableResizing: false,
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
    cell: ({ cell }) => {
      return <span className="font-mono">{cell.getValue() as string}</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "isPrivate",
    header: "Private",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ cell }) => {
      return (
        <span>{new Date(cell.getValue() as string).toLocaleDateString()}</span>
      );
    },
  },
];
