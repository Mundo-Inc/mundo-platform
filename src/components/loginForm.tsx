"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AuthContext } from "@contexts/AuthContext";
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useContext(AuthContext);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await signIn({ email: data.email, password: data.password }).catch(
      (error) => {
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Invalid credentials");
            break;
          case "auth/user-not-found":
            toast.error("User not found");
            break;
          case "auth/wrong-password":
            toast.error("Wrong password");
            break;
          default:
            toast.error(error.message);
        }
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xs flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
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
          Log-in
        </Button>
      </form>
    </Form>
  );

  // return (
  //   <form
  //     className="flex w-full max-w-md flex-col gap-y-4"
  //     onSubmit={handleSubmit}
  //   >
  //     <TextField
  //       id="email"
  //       name="email"
  //       placeholder="Email"
  //       type="email"
  //       required
  //       tabIndex={1}
  //     />
  //     <div className="-mb-3 flex justify-end text-sm">
  //       <p className="text-white">
  //         <Link href="/forgot-password" tabIndex={4}>
  //           Forgot your password? <span className="underline">Click here</span>
  //         </Link>
  //       </p>
  //     </div>
  //     <TextField
  //       required
  //       id="password"
  //       name="password"
  //       placeholder="Password"
  //       type="password"
  //       tabIndex={2}
  //     />
  //     <div className="flex w-full justify-end">
  //       <Button
  //         type="submit"
  //         variant="secondary"
  //         tabIndex={3}
  //         isLoading={isSubmitting}
  //       >
  //         Log-in
  //       </Button>
  //     </div>
  //   </form>
  // );
}
