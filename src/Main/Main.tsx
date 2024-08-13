import Navbar from "../Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "../Auth";
import { useEffect } from "react";

function Main() {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      navigate("/login");
    }
  }, [uid, navigate]);

  return !uid ? (
    <Auth />
  ) : (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Main;
