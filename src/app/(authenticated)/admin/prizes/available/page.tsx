"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import DashboardMainContent from "@/components/dashboardMainContent";
import DataTable from "@/components/dataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPrizes } from "@/fetchers/missions";
import { fetchWithToken } from "@/lib/fetcher";
import { uploadImage } from "@/lib/upload";
import { cn } from "@/lib/utils";
import env from "@env";
import { columns } from "./columns";

const formSchema = z.object({
  title: z.string().min(1),
  amount: z.string(),
  limit: z.string(),
  image: z.any().refine((val) => val[0], "Please add a thumbnail"),
});

export default function Page() {
  const [thumbnail, setThumbnail] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "10000",
      limit: "100",
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const thumbnail = data.image[0];

      if (!thumbnail) {
        throw new Error("Please add a thumbnail");
      }

      const media = await uploadImage(thumbnail, "prize");

      await fetchWithToken(`${env.NEXT_PUBLIC_API_URL}/rewards/prizes`, {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          thumbnail: media.data._id,
          count: data.limit,
          amount: data.amount,
        }),
      });

      toast.success("Prize created successfully!");
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const errorKeys = Object.keys(form.formState.errors);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const { isPending, data } = useQuery({
    queryKey: [
      "rewards",
      "prizes",
      {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      },
    ],
    queryFn: () => getPrizes(pagination),
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.data ?? defaultData,
    columns,
    rowCount: data?.pagination?.totalCount ?? 0,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
  });

  return (
    <Dialog>
      <DashboardMainContent className="gap-y-4 p-4">
        <div className="flex h-9 w-full shrink-0 items-center justify-between">
          <h1 className="text-xl font-bold">Avaliable Prizes List</h1>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Create Prize
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Prize</DialogTitle>
            <DialogDescription>
              Here you can add prizes that users can redeem! Add wisely!
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input
                id="image"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                {...form.register("image", {
                  onChange: handleFileChange,
                })}
              />

              <div className="flex w-full flex-col gap-4 md:flex-row">
                <Label
                  htmlFor="image"
                  className={cn(
                    "dashed order-2 flex cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed md:order-1",
                    form.formState.errors.image
                      ? "border-red-500"
                      : "transition-colors hover:border-white/50",
                  )}
                  style={{
                    width: 140,
                    height: 170,
                  }}
                >
                  {form.formState.errors.image ? (
                    <p className="text-center text-sm text-red-500">
                      {form.formState.errors.image.message as string}
                    </p>
                  ) : thumbnail ? (
                    <Image
                      className=""
                      src={thumbnail}
                      alt="thumbnail"
                      width={140}
                      height={170}
                      style={{
                        width: 140,
                        height: 170,
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <p className="text-center text-sm text-gray-500">
                      Add thumbnail
                      <br />
                      (140 X 170)
                    </p>
                  )}
                </Label>

                <div className="order-1 flex flex-grow flex-col justify-between gap-4 md:order-2">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount To Redeem (Phantom Coins)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Amount"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="limit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Limit</FormLabel>
                        <FormControl>
                          <Input placeholder="Limit" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {errorKeys.length > 0 && (
                <Alert variant="destructive">
                  <AlertTitle>Error in these fields</AlertTitle>
                  <AlertDescription>{errorKeys.join(", ")}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                variant="outline"
                isLoading={form.formState.isSubmitting}
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>

        <DataTable table={table} isPending={isPending} columns={columns} />
      </DashboardMainContent>
    </Dialog>
  );
}
