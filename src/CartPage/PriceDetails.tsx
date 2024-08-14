import React from "react";
import {
  calculateDiscountedValue,
  calculateTotalPrice,
  getTotalPrice,
} from "../utils/utils";
import Button from "../Components/Button/Button";

interface PriceDetailsProps {
  productsList: any[];
  handleCheckout: () => void;
  setCurrentDiscount: (data?: any) => void;
  currentDiscount: any;
  disabled: boolean;
}

const PriceDetails = ({
  productsList,
  handleCheckout,
  setCurrentDiscount,
  currentDiscount,
  disabled,
}: PriceDetailsProps) => {
  return (
    <div className="light-border sticky top-4 p-6 h-[40%] w-full md:w-[30vw] !top-[70px]">
      <p className="py-2 font-medium">Price Details</p>
      <hr className="w-[100%] h-[2px] bg-[ccc]" />
      <div className="py-3 flex justify-between">
        <p>Price ({productsList?.length} items)</p>
        <p>${Number(getTotalPrice(productsList))?.toFixed(2)}</p>
      </div>
      {getTotalPrice(productsList) > 0 && (
        <div className="py-3 flex justify-between">
          <div className="w-[60%] ">
            <p>Discount</p>
            <p className="text-[12px] text-darkgrey leading-3">
              Discount can be availed only on orders above 200$
            </p>
          </div>
          <div className="text-green">
            -
            <select
              disabled={getTotalPrice(productsList) < 200}
              name="Discount"
              onChange={(e) => {
                if (e?.target?.value[0] === "d") {
                  setCurrentDiscount({ type: "percentage", value: 10 });
                } else {
                  setCurrentDiscount({ type: "flat", value: 200 });
                }
              }}
              value={currentDiscount?.type === "flat" ? "f200" : "d10"}
              className={`w-fit px-2 cursor-pointer text-green ${
                getTotalPrice(productsList) <= 200 ? "!cursor-not-allowed" : ""
              }`}
            >
              <option value="d10">10%</option>
              <option value="f200">$200</option>
            </select>
          </div>
        </div>
      )}
      <hr className="w-[100%] h-[2px] bg-[ccc]" />
      <div className="py-2 flex justify-between">
        <p>Total amount</p>
        <p>
          $
          {getTotalPrice(productsList) < 200
            ? Number(getTotalPrice(productsList))?.toFixed(2)
            : Number(
                calculateTotalPrice(
                  getTotalPrice(productsList),
                  currentDiscount
                )
              )?.toFixed(2)}
        </p>
      </div>
      {getTotalPrice(productsList) > 200 ? (
        <>
          <hr className="w-[100%] h-[2px] bg-[ccc]" />
          <div className="py-2 text-green font-semibold mt-8">
            <p>
              You will save $
              {Number(
                calculateDiscountedValue(
                  getTotalPrice(productsList),
                  currentDiscount
                )
              )?.toFixed(2)}{" "}
              on this order
            </p>
          </div>{" "}
        </>
      ) : (
        ""
      )}
      <div className="flex justify-end mt-4">
        <Button disabled={disabled} onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default PriceDetails;
