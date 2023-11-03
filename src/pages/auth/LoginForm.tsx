"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/types";
import { useFirebaseServices } from "@/store/useFirebase";
import backgroundImage from "@/assets/loginBackground.jpg";

const LoginForm = () => {
  const { signIn } = useFirebaseServices();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signInFormSchema>) => {
    signIn(data.email, data.password);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen gap-10 bg text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="text-center">
        <h1 className="text-7xl font-bold text-green-500 text-opacity-70">
          CDBRS
        </h1>
        <p className="text-sm">
          Comprehensive Driver Behavior Reporting System
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 border border-black rounded-md p-4 backdrop-blur-lg"
        >
          <h1 className="text-center text-3xl">Sign In</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className=" bg-transparent placeholder:text-white"
                  />
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
                    placeholder="Enter your password"
                    {...field}
                    className="bg-transparent placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p>
            Dont have an Account?{" "}
            <Link to={"/signup"} className="font-bold">
              Create Here
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
