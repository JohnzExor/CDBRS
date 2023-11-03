import { Link } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

import backgroundImage from "@/assets/loginBackground.jpg";

import { IoIosArrowBack } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviewFormSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useFirebaseServices } from "@/store/useFirebase";

const Reviews = () => {
  const { currentDriverUid, driverData } = useFirebaseServices();
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      textReview: "",
    },
  });

  const onSubmit = (data: z.infer<typeof reviewFormSchema>) => {
    console.log(data);
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="rounded-md backdrop-blur-lg border border-black p-4 w-80 flex flex-col items-center">
        <div className="flex items-center mr-auto">
          <button className="ml-auto">
            <Link to={`/driver/${currentDriverUid}`}>
              <IoIosArrowBack size={30} />
            </Link>
          </button>
          <button className=" text-xs border p-1 rounded-md">
            Driver Reviews
          </button>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-4xl">DRIVER</h1>
          <p className=" text-xs">Behavioral Score:</p>
          <h1 className=" text-8xl font-semibold text-green-500 text-opacity-70">
            {driverData.behavioralScore}
          </h1>
        </div>
        <div>
          <h1 className="text-center mb-2">Reviews</h1>
          <div className=" border border-black p-2 rounded-lg">
            {true ? (
              <div className=" flex flex-col bg-green-500 bg-opacity-30 p-2 rounded-lg mb-2 overflow-y-auto max-h-32">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className=" text-xs">Commended + 50</p>
                    <h1>Johnzyll Jimeno</h1>
                  </div>
                </div>

                <p className=" w-60 break-words text-xs mt-4">Good Driver!</p>
              </div>
            ) : (
              <p>No Reviews Yet</p>
            )}
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="textReview"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Write an positive review"
                            {...field}
                            className=" bg-transparent placeholder:text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-2">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
