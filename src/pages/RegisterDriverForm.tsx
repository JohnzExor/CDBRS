import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";

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
import { IoIosArrowBack } from "react-icons/io";

import { useFirebaseServices } from "@/store/useFirebase";
import { driverRegFormSchema } from "@/lib/types";
import backgroundImage from "@/assets/loginBackground.jpg";
import { Label } from "@radix-ui/react-label";

const RegisterDriverForm = () => {
  const navigate = useNavigate();
  const { driverRegistration, userData } = useFirebaseServices();

  const form = useForm<z.infer<typeof driverRegFormSchema>>({
    resolver: zodResolver(driverRegFormSchema),
    defaultValues: {
      licenseNo: "",
      plateNo: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof driverRegFormSchema>) => {
    driverRegistration(
      `${userData.firstName} ${userData.lastName}`,
      values.licenseNo,
      values.plateNo,
      userData.uid
    );
    navigate("/home");
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
        <h1 className="text-7xl font-bold text-lime-500">CDBRS</h1>
        <p className="text-sm">
          Comprehensive Driver Behavior Reporting System
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 border border-black rounded-md p-4 backdrop-blur-lg"
        >
          <div className="flex items-center mr-auto">
            <button>
              <Link to={"/home"}>
                <IoIosArrowBack size={30} />
              </Link>
            </button>
            <h1 className=" text-center text-2xl">Driver Registration</h1>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Drivers License Picture</Label>
            <Input id="picture" type="file" className="bg-transparent" />
          </div>
          <FormField
            control={form.control}
            name="licenseNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License NO:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your License number"
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
            name="plateNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plate NO:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your License Plate Number"
                    {...field}
                    className="bg-transparent placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterDriverForm;
