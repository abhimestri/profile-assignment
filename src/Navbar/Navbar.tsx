import { useContext } from "react";
import Button from "../Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../store/CartContet";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItemsInCart } = useContext(CartContext);

  return (
    <div className="z-100 sticky top-0 bg-[#d3d3d3] h-[10vh] !w-[100vw] flex justify-between items-center px-2 !py-6 md:p-8 h-[8vh]">
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
          className="!px-2 text-[12px] md:!text-[14px]"
        >
          {location?.pathname === "/cart-page" ? (
            "Go to Products"
          ) : (
            <div className="flex gap-x-1 items-center">
              <p>View Cart</p>
              {totalItemsInCart > 0 ? (
                <div className="border-darkgrey border-[1px] w-[24px] h-[24px] text-[14px] !rounded-[50%]">
                  <p className="text-center p-0">{totalItemsInCart}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Button>
        <Button
          onClick={() => {
            localStorage?.removeItem("uid");
            navigate("/login");
          }}
          className="text-[12px] md:!text-[16px]"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
