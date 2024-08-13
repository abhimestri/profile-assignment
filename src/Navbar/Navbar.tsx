import Button from "../Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#d3d3d3] h-[8vh] w-full flex justify-between items-center p-8">
      <p className="text-[20px] font-medium">
        {location?.pathname === "/cart-page" ? "Your Cart" : "Products"}
      </p>
      <div className="flex gap-x-4 items-center">
        <Button
          variant="secondary"
          onClick={() =>
            location?.pathname === "/cart-page"
              ? navigate("/")
              : navigate("/cart-page")
          }
        >
          {location?.pathname === "/cart-page" ? "Go to Products" : "View Cart"}
        </Button>
        <Button
          onClick={() => {
            localStorage?.removeItem("uid");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
