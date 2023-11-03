import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import backgroundImage from "@/assets/loginBackground.jpg";

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
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { useFirebaseServices } from "@/store/useFirebase";
import { signUpFormSchema } from "@/lib/types";

const SignUpForm = () => {
  const { signUp } = useFirebaseServices();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    signUp(values.firstName, values.lastName, values.email, values.password);
  };
  return (
    <div
      className=" p-4 flex flex-col justify-center items-center h-screen w-full gap-4 bg text-white"
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
          className="border border-black rounded-md p-4 backdrop-blur-lg"
        >
          <h1 className=" text-center text-3xl">Create an Account</h1>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    className="bg-transparent placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    className="bg-transparent placeholder:text-white"
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                    className="bg-transparent placeholder:text-white"
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
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                    className="bg-transparent placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-2">
            Create Account
          </Button>
          <p>
            Already have an Account?{" "}
            <Link to={"/"} className="font-bold">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
