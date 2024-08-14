import Button from "../Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#d3d3d3] h-[10vh] !w-[100vw] flex justify-between items-center px-2 !py-6 md:p-8 h-[8vh]">
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
          className="!px-2 text-[12px] md:text-[14px]"
        >
          {location?.pathname === "/cart-page" ? (
            "Go to Products"
          ) : (
            <div className="flex gap-x-1 items-center">
              <p>View Cart</p>
              <div className="border-darkgrey border-[1px] px-[6px] py-[1px] text-[12px] !rounded-[50%] md:px-[8px] py-[2px] text-[14px]">
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
          className="text-[12px] md:text-[14px]"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
