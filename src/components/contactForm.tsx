"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, type ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { fetchWithOptionalToken } from "@/lib/fetcher";
import env from "@env";
import { toast } from "sonner";
import { AuthContext } from "@/contexts/AuthContext";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  content: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"form">) {
  const { user } = useContext(AuthContext);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email?.address ?? "",
      subject: "",
      content: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email.address);
    }
  }, [user?.name, user?.email?.address]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(data: FormData) {
    const url = new URL(`${env.NEXT_PUBLIC_API_URL}/general/contact`);

    await fetchWithOptionalToken(url.href, {
      method: "POST",
      body: JSON.stringify(data),
    });

    toast.success("Message sent successfully!");
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid w-full grid-cols-2 gap-4", className)}
        style={{
          gridAutoRows: "min-content",
        }}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Who's the explorer?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your carrier pigeon address?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="What's the Vibe?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Share Your Journey" {...field} />
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
  );
}
