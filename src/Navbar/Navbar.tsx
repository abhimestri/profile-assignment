import Button from "../Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#d3d3d3] h-[8vh] !w-[100vw] flex justify-between items-center p-8">
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
          {location?.pathname === "/cart-page" ? (
            "Go to Products"
          ) : (
            <div className="flex gap-x-2 items-center">
              <p>View Cart</p>
              <div className="border-darkgrey border-[1px] px-[8px] py-[2px] !rounded-[50%] text-[14px]">
                4
              </div>
            </div>
          )}
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
