import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useParams } from "react-router-dom";

import { AiOutlineHistory } from "react-icons/ai";
import { MdOutlineReviews } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { BsQrCode } from "react-icons/bs";

import QRCode from "react-qr-code";
import backgroundImage from "@/assets/loginBackground.jpg";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";
import { useFirebaseServices } from "@/store/useFirebase";

const Driver = () => {
  const { getDriverData, driverData, setCurrentDriverUid } =
    useFirebaseServices();
  const param = useParams();
  useEffect(() => {
    getDriverData(param.uid as string);
    setCurrentDriverUid(param.uid as string);
  }, []);
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
            <Link to={"/home"}>
              <IoIosArrowBack size={30} />
            </Link>
          </button>
          <button className=" text-xs border p-1 rounded-md">
            Driver Profile
          </button>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-4xl">DRIVER</h1>
          <p className=" text-xs">Behavioral Score:</p>
          <h1 className=" text-8xl font-semibold text-green-500 text-opacity-70">
            {driverData.behavioralScore}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Avatar className=" w-52 h-52">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className=" font-semibold text-2xl">{driverData.fullName}</h1>
            <p className=" text-xs">{driverData.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-xs text-center">
            <p>
              CDBRS ID:{" "}
              <span className=" text-green-100">{driverData.uid}</span>
            </p>
            <p>
              Drivers ID:{" "}
              <span className=" text-green-100">{driverData.licenseNo}</span>
            </p>
            <p>
              License Plate No:{" "}
              <span className=" text-green-100">{driverData.plateNo}</span>
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex flex-col items-center p-4 rounded-xl gap-1">
                <div className=" p-4 border rounded-full backdrop:blur-3xl bg-black bg-opacity-50 shadow-2xl">
                  <BsQrCode className="w-10 h-10" />
                </div>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className=" w-fit flex flex-col items-center">
              <AlertDialogCancel className=" mr-auto">
                <IoIosArrowBack size={25} />
                QR CODE
              </AlertDialogCancel>
              <QRCode
                value={`cdbrs-system-app.com/drivers/${driverData.uid}`}
              />
              <div className=" -space-y-2 text-center">
                <p className="font-bold">CDBRS UID:</p>
                <p>{driverData.uid}</p>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1 mt-1 text-xs">
            <button className="border border-black rounded-md p-2 bg-opacity-40 bg-green-300">
              <Link to={"/reviews"} className=" flex items-center gap-1">
                <IoAnalytics />
                Reviews
              </Link>
            </button>
            <button className=" border border-black rounded-md p-2 bg-opacity-40 bg-blue-500 flex gap-1 items-center">
              <Link to={"/behaviors"} className=" flex items-center gap-1">
                <AiOutlineHistory />
                Behaviors
              </Link>
            </button>
            <button className=" border border-black rounded-md p-2 bg-opacity-40 bg-red-500 flex gap-1 items-center">
              <Link to={"/report"} className=" flex items-center gap-1">
                <MdOutlineReviews />
                Report
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driver;
