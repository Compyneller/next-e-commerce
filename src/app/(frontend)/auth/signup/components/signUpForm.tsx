"use client";
import img from "@/assets/Animation - 1737365822687.json";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Lottie from "lottie-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Spinner from "@/components/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z.string().min(2).max(50).includes("@", {
      message: "Email (@) is required",
    }),
    password: z
      .string()
      .min(6, {
        message: "At least six character ",
      })
      .max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const res = await axios.post("/api/signup", values);
      if (res.status === 200 && res.data.success) {
        toast.success(res?.data?.message);
        setLoading(false);
        router.push("/auth/login");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return toast.error(error.response?.data || "An error occurred");
      } else {
        return toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 py-10 w-full max-w-3xl rounded-lg border">
      <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-3">
        <div className="w-full h-full">
          <Lottie animationData={img} loop={true} />
        </div>
        <div className="w-full ">
          <div className="flex gap-2 mb-5 items-center justify-center">
            <Key size={30} />
            <h1 className="text-4xl font-bold  text-center">Sign Up</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email..." {...field} />
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
                      <Input
                        type="password"
                        placeholder="Enter password..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-3">
                <p>
                  Login{" "}
                  <Link href="/auth/login" className="text-blue-500">
                    Click here...
                  </Link>
                </p>
                <Button size={"sm"} type="submit">
                  <Spinner loading={loading} /> Sign Up
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
