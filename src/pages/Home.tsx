import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "react-router-dom";
import backgroundImage from "@/assets/loginBackground.jpg";

import { AiOutlineHistory } from "react-icons/ai";
import { MdOutlineReviews } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { useFirebaseServices } from "@/store/useFirebase";

const Home = () => {
  const { userData, signOut } = useFirebaseServices();
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="rounded-md backdrop-blur-lg border border-black p-4 w-80 flex flex-col items-center">
        <button className=" text-xs border p-1 rounded-md">
          {userData.status === "driver" ? (
            <Link to={`/driver/${userData.uid}`}>Enter Drivers Profile</Link>
          ) : (
            <Link to={`/registerdriver`}>Register as a Driver!</Link>
          )}
        </button>
        <div className="flex items-center gap-4">
          <Avatar className=" w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className=" font-semibold">{`${userData.firstName} ${userData.lastName}`}</h1>
            <p className=" text-sm">{userData.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className=" border border-black rounded-md p-2 bg-opacity-40 bg-slate-600 mt-2 flex items-center gap-1">
            <FiSettings />
            Settings
          </button>
          <button
            className=" border border-black rounded-md p-2 bg-opacity-40 bg-slate-600 mt-2 flex items-center gap-1"
            onClick={() => signOut()}
          >
            <IoLogOutOutline size={20} />
            Logout
          </button>
        </div>
        <div className="flex items-center gap-4 p-4 mt-4">
          <img
            src="./src/assets/GoogleMapTA.jpeg"
            className="w-48 rounded-full border shadow-2xl"
          />
          <div className="flex flex-col gap-1 mt-1">
            <button className="border border-black rounded-md p-2 bg-opacity-50 bg-green-300">
              <IoAnalytics />
            </button>
            <button className=" border border-black rounded-md p-2 bg-opacity-40 bg-red-500">
              <MdOutlineReviews />
            </button>
            <button className=" border border-black rounded-md p-2 bg-opacity-40 bg-blue-500">
              <AiOutlineHistory />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl gap-1">
          <div className=" p-4 border rounded-full backdrop:blur-3xl bg-black bg-opacity-50 shadow-2xl">
            <BsQrCode className="w-10 h-10" />
          </div>
          <p className=" text-xs">
            Scan a Drivers QR Code to see their behaviors!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
