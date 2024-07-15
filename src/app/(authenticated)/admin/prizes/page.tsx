"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useMemo, useRef, useState } from "react";

import DashboardMainContent from "@/components/dashboardMainContent";
import DataTablePagination from "@/components/dataTablePagination";
import Spinner from "@/components/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminFetchUsers } from "@/fetchers/users";
import { columns } from "./columns";
import { AuthContext } from "@/contexts/AuthContext";
import { auth } from "@/firebase/config";
import { toast } from "sonner";
import env from "@env";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fetchWithToken } from "@/lib/fetcher";
import { uploadImage } from "@/lib/upload";

const formSchema = z.object({
  title: z.string().min(1),
  amount: z.string(),
  limit: z.string(),
  image: z.any().refine((val) => val[0], "Please add a thumbnail"),
});

export default function Page() {
  const [error, setError] = useState<string>();
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
    const thumbnail = data.image[0];

    if (!thumbnail) {
      toast.error("Please add a thumbnail");
      return;
    }

    const media = await uploadImage(thumbnail, "prize");

    // submit form

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
  }

  return (
    <div className="flex h-full w-full flex-col gap-y-2 p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-auto" variant="outline">
            Create Prize
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Prize</DialogTitle>
            <DialogDescription>
              Here you can add prizes that users can redeem! Add wisely!
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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

              {Object.keys(form.formState.errors).join(", ")}
              {/* {form.formState.errors && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Error</AlertDescription>
                </Alert>
              )} */}

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
      </Dialog>

      {/* <Dialog open={dialogOpen} onClose={handleCloseDialog} fullScreen>
        <DialogTitle>Create Prize</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can add prizes that users can redeem! Add wisely!
          </DialogContentText>
          <div className="flex w-full flex-row">
            <div className="flex basis-full flex-col gap-5 p-4">
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="redemption-amount"
                label="Amount To Redeem (Phantom Coins)"
                type="number"
                fullWidth
                variant="standard"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAmount(parseInt(e.target.value));
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="redemption-amount"
                label="Limit"
                type="number"
                fullWidth
                variant="standard"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCount(parseInt(e.target.value));
                }}
              />
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                onClick={() => {
                  handleThumbnailUploadClick();
                }}
              >
                UPLOAD THUMBNAIL (140 X 170)
              </Button>
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  width={140}
                  height={170}
                  style={{ objectFit: "contain" }}
                ></Image>
              )}
            </div>
          </div>

          <p className="mt-4 font-mono text-lg text-red-400">{error}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <LoadingButton
            onClick={handlePrizeCreate}
            disabled={!thumbnail || !title || !amount || !count}
            loading={isLoading}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog> */}

      <h2 className="mr-auto font-bold">Avaliable Prizes List</h2>
      {/* <PrizesList refresh={refresh} /> */}
      <h2 className="mr-auto font-bold">Redemption Inquiries</h2>
      {/* <RedemptionList refresh={refresh} /> */}
    </div>
  );
}
