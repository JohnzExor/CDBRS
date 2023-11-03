import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import Home from "./pages/Home";
import "./style.css";
import Driver from "./pages/Driver";
import Reviews from "./pages/Reviews";
import Behaviors from "./pages/Behaviors";
import Report from "./pages/Report";
import RegisterDriverForm from "./pages/RegisterDriverForm";
import ReportDataTable from "./pages/ReportDataTable";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./store/firebase";
import { useFirebaseServices } from "./store/useFirebase";

const App = () => {
  const { getUserData } = useFirebaseServices();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData();
        navigate("/home");
      } else {
        getUserData();
      }
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registerdriver" element={<RegisterDriverForm />} />
        <Route path={`/driver/:uid`} element={<Driver />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/behaviors" element={<Behaviors />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reportdata" element={<ReportDataTable />} />
        <Route path="*" element="page not found" />
      </Routes>
    </div>
  );
};

export default App;
