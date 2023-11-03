import { Link } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import { useFirebaseServices } from "@/store/useFirebase";
import backgroundImage from "@/assets/loginBackground.jpg";

const Behaviors = () => {
  const { currentDriverUid, driverData } = useFirebaseServices();
  return (
    <div
      className="bg h-screen w-full flex flex-col items-center justify-center text-white"
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
            Driver Behavior
          </button>
        </div>
        <div className="flex items-center">
          <div className="text-xs text-center mt-4">
            <p className="flex flex-col">
              CDBRS ID:
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
        </div>
        <div className="text-center mt-4">
          <h1 className=" text-5xl font-bold text-green-500 text-opacity-70">
            {driverData.behavioralScore}
          </h1>
          <h1 className="text-4xl">DRIVER</h1>
          <p className=" text-xs">Behavioral Score</p>
        </div>
        <div className=" text-center border border-black rounded-b-3xl rounded-t-3xl px-4 py-1 bg-white bg-opacity-10 mt-2">
          <h1 className=" text-6xl text-green-500 text-opacity-70">Good</h1>
          <p className=" text-xs">Behavior Status</p>
        </div>
        <div className="flex gap-4 mt-4">
          <div className=" text-center">
            <h1 className=" text-2xl font-bold text-green-500">
              {driverData.reportTimes}
            </h1>
            <p className=" text-xs">Report Times</p>
          </div>
          <div className=" text-center  ">
            <h1 className=" text-2xl font-bold text-red-500">
              {driverData.violations}
            </h1>
            <p className=" text-xs">Violations</p>
          </div>
          <div className=" text-center ">
            <h1 className=" text-2xl font-bold text-green-500">
              {driverData.accidents}
            </h1>
            <p className=" text-xs">Accidents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Behaviors;
