"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import DashboardMainContent from "@/components/dashboardMainContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getFlags } from "@/fetchers/flags";
import { Media } from "@/interfaces/Media";
import { fetchWithToken } from "@/lib/fetcher";
import { timeAgo } from "@/lib/utils";
import env from "@env";

const formSchema = z.object({
  note: z.string().optional(),
});

export default function Page() {
  const [dialog, setDialog] = useState<{
    id: string;
    action: "DELETE" | "IGNORE";
  } | null>(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      "admin",
      "flags",
      {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      },
    ],
    queryFn: () => getFlags(pagination),
    placeholderData: keepPreviousData,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!dialog) return;

    try {
      await fetchWithToken(
        `${env.NEXT_PUBLIC_API_URL}/admin/flags/${dialog.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            action: dialog.action,
            note: data.note,
          }),
        },
      );

      toast.success(
        dialog.action === "DELETE" ? "Deleted" : "Marked as resolved",
      );
      form.reset();
      setDialog(null);
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={dialog !== null} onOpenChange={(o) => !o && setDialog(null)}>
      <DashboardMainContent className="gap-y-4 p-4">
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
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

        <section className="flex w-full flex-col gap-4">
          {data && data.data.length === 0 && (
            <h1 className="text-center">No flagged content</h1>
          )}
          {data &&
            data.data.map((flag: any) => (
              <article
                key={flag._id}
                className="bg-darkShade-2 flex w-full flex-col rounded-md p-4"
              >
                <header className="flex items-center justify-between">
                  <div className="flex">
                    <Avatar>
                      <AvatarImage src={flag.user.profileImage} />
                      <AvatarFallback>
                        {flag.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2 flex flex-col justify-center">
                      <span className="text-xs italic text-secondary">
                        Reported By
                      </span>
                      <h2>{flag.user.name}</h2>
                    </div>
                  </div>

                  <span className="text-sm">
                    {timeAgo(new Date(flag.createdAt))}
                  </span>
                </header>

                <hr className="mt-2 border-gray-800" />

                <div className="grid grid-cols-[400px_1fr]">
                  <ul className="flex w-full flex-col gap-y-1 p-2">
                    <li>
                      <h3 className="text-sm font-semibold text-secondary">
                        Type
                      </h3>
                      {flag.targetType}
                    </li>
                    <li>
                      <h3 className="text-sm font-semibold text-secondary">
                        Flag type
                      </h3>
                      <span className="capitalize text-red-500">
                        {flag.flagType.replace("_", " ").toLowerCase()}
                      </span>
                    </li>
                    {flag.note && (
                      <li>
                        <h3 className="text-sm font-semibold text-secondary">
                          Note
                        </h3>
                        <div className="w-full rounded-md bg-gray-900 px-2 py-1">
                          {flag.note}
                        </div>
                      </li>
                    )}
                    <li className="mt-4 flex gap-x-4">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setDialog({
                            id: flag._id,
                            action: "DELETE",
                          });
                        }}
                      >
                        Delete {flag.targetType}
                      </Button>
                      <Button
                        className="border-green-400 text-green-400"
                        variant="outline"
                        onClick={() => {
                          setDialog({
                            id: flag._id,
                            action: "IGNORE",
                          });
                        }}
                      >
                        No Action Needed
                      </Button>
                    </li>
                  </ul>
                  <section className="border-l border-gray-800 p-2">
                    {flag.targetType === "Review" ? (
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-2">
                          <Avatar>
                            <AvatarImage
                              src={flag.target.writer.profileImage}
                            />
                            <AvatarFallback>
                              {flag.target.writer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {flag.target.writer.name}
                            </span>
                            <span className="font-mono text-xs text-secondary">
                              @{flag.target.writer.username}
                              {" | "}
                              {flag.target.writer.email.address}
                            </span>
                          </div>

                          <div className="ml-auto flex flex-col items-end text-xs text-secondary">
                            <span>
                              Created {timeAgo(new Date(flag.target.createdAt))}
                            </span>
                            <span>
                              Updated {timeAgo(new Date(flag.target.updatedAt))}
                            </span>
                          </div>
                        </div>
                        <p className="w-full whitespace-pre-wrap">
                          {flag.target.content}
                        </p>
                        {flag.target.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {flag.target.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="rounded-md bg-gray-900 px-2 py-1"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {flag.target.media.length > 0 && (
                          <div className="grid grid-cols-4 gap-2">
                            {flag.target.media.map((media: Media) =>
                              media.type === "image" ? (
                                <Image
                                  key={media._id}
                                  src={media.src}
                                  alt={media.caption}
                                  width={320}
                                  height={400}
                                  style={{
                                    objectFit: "cover",
                                    width: 320,
                                    height: 400,
                                  }}
                                  className="rounded-md"
                                />
                              ) : (
                                <video
                                  key={media._id}
                                  src={media.src}
                                  controls
                                  className="rounded-md"
                                  height={400}
                                  style={{
                                    objectFit: "cover",
                                    width: 320,
                                    height: 400,
                                  }}
                                />
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    ) : flag.targetType === "Comment" ? (
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-2">
                          <Avatar>
                            <AvatarImage
                              src={flag.target.author.profileImage}
                            />
                            <AvatarFallback>
                              {flag.target.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {flag.target.author.name}
                            </span>
                            <span className="font-mono text-xs text-secondary">
                              @{flag.target.author.username}
                              {" | "}
                              {flag.target.author.email.address}
                            </span>
                          </div>
                          <div className="ml-auto flex flex-col items-end text-xs text-secondary">
                            <span>
                              Created {timeAgo(new Date(flag.target.createdAt))}
                            </span>
                            <span>
                              Updated {timeAgo(new Date(flag.target.updatedAt))}
                            </span>
                          </div>
                        </div>
                        <p className="w-full whitespace-pre-wrap">
                          {flag.target.content}
                        </p>
                      </div>
                    ) : flag.targetType === "CheckIn" ? (
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-2">
                          <Avatar>
                            <AvatarImage src={flag.target.user.profileImage} />
                            <AvatarFallback>
                              {flag.target.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {flag.target.user.name}
                            </span>
                            <span className="font-mono text-xs text-secondary">
                              @{flag.target.user.username}
                              {" | "}
                              {flag.target.user.email.address}
                            </span>
                          </div>
                          <div className="ml-auto flex flex-col items-end text-xs text-secondary">
                            <span>
                              Created {timeAgo(new Date(flag.target.createdAt))}
                            </span>
                            <span>
                              Updated {timeAgo(new Date(flag.target.updatedAt))}
                            </span>
                          </div>
                        </div>
                        <p className="w-full whitespace-pre-wrap">
                          {flag.target.caption ?? "-"}
                        </p>
                      </div>
                    ) : (
                      flag.targetType === "Homemade" && (
                        <div className="flex flex-col gap-y-2">
                          <div className="flex items-center gap-x-2">
                            <Avatar>
                              <AvatarImage
                                src={flag.target.user.profileImage}
                              />
                              <AvatarFallback>
                                {flag.target.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                {flag.target.user.name}
                              </span>
                              <span className="font-mono text-xs text-secondary">
                                @{flag.target.user.username}
                                {" | "}
                                {flag.target.user.email.address}
                              </span>
                            </div>
                            <div className="ml-auto flex flex-col items-end text-xs text-secondary">
                              <span>
                                Created{" "}
                                {timeAgo(new Date(flag.target.createdAt))}
                              </span>
                              <span>
                                Updated{" "}
                                {timeAgo(new Date(flag.target.updatedAt))}
                              </span>
                            </div>
                          </div>
                          <p className="w-full whitespace-pre-wrap">
                            {flag.target.content}
                          </p>
                        </div>
                      )
                    )}
                  </section>
                </div>
              </article>
            ))}
        </section>
      </DashboardMainContent>
    </Dialog>
  );
}
