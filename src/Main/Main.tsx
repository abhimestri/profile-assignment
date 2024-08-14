import Navbar from "../Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "../Auth";
import { useEffect, useState } from "react";
import { CartContext } from "../store/CartContet";

function Main() {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();

  const [totalItemsInCart, setTotalItemsInCart] = useState<number>(0);

  useEffect(() => {
    if (!uid) {
      navigate("/login");
    }
  }, [uid, navigate]);

  const value = {
    totalItemsInCart,
    setTotalItemsInCart,
  };

  return !uid ? (
    <Auth />
  ) : (
    <CartContext.Provider value={value}>
      {" "}
      <div>
        <Navbar />
        <Outlet />
      </div>
    </CartContext.Provider>
  );
}

export default Main;
