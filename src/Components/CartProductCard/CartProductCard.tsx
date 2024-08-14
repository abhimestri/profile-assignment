import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { ProductProps } from "../../ProductsListPage/ProductListPage";
import notify from "../Notify/Notify";

interface CartProductCardProps {
  product: ProductProps;
  handleRemoveProduct: (data?: any) => void;
  handleUpdateQty: (data?: any) => void;
  setDisabled: (data?: any) => void;
}

const CartProductCard = ({
  product,
  handleRemoveProduct,
  handleUpdateQty,
  setDisabled,
}: CartProductCardProps) => {
  const [qty, setQty] = useState<number>(Number(product?.qty));

  useEffect(() => {
    if (qty <= 0 || qty > 100) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [qty, setDisabled]);

  return (
    <div className="w-full dark-border p-6 flex gap-x-4">
      <div className="light-border flex justify-center w-[40%] md:w-[20%]">
        <img
          className="aspect-square !h-[160px] !w-[160px]"
          src={product?.image}
          alt=""
        />
      </div>
      <div className="w-[60%]">
        <p className="font-medium text-[20px] md:text-[1.6vw]">
          {product?.name}
        </p>
        <p className="w-full line-clamp-1 text-[14px] md:w-[40vw] text-[1.1vw]">
          {product?.description}
        </p>
        <p className="font-medium mt-1 text-[18px] md:text-[1.2vw]">
          Price : ${product?.price}
        </p>
        <div className="mt-2 md:flex items-center gap-x-4 mt-8">
          <div className="flex gap-x-2 items-center">
            <Button
              variant="secondary"
              className="!p-[9px] !py-[1px]"
              onClick={() => {
                handleUpdateQty({
                  ...product,
                  qty: Number(product?.qty) - 1,
                });
                setQty(Number(product?.qty) - 1);
              }}
              disabled={product?.qty === 1}
            >
              -
            </Button>
            <input
              onChange={(e) => {
                setQty(Number(e?.target?.value));
              }}
              onBlur={() => {
                if (qty >= 1 && qty <= 100) {
                  handleUpdateQty({
                    ...product,
                    qty: qty,
                  });
                } else {
                  notify({
                    text:
                      qty > 100
                        ? "Quantity can't be more than 100"
                        : "Quantity cant be 0!",
                    type: "error",
                  });
                  //   setQty(Number(product?.qty));
                }
              }}
              value={qty}
              className={`px-4 w-[60px] text-center py-1 light-border !rounded-[4px] ${
                (qty === 0 || qty > 100) && "!border-red"
              }`}
            />

            <Button
              variant="secondary"
              className="!p-[9px] !py-[1px]"
              onClick={() => {
                handleUpdateQty({
                  ...product,
                  qty: Number(product?.qty) + 1,
                });
                setQty(Number(product?.qty) + 1);
              }}
            >
              +
            </Button>
          </div>
          <Button
            variant="secondary"
            className="px-[8px] py-[4px] text-[14px] rounded-[4px] mt-4 md:mt-0"
            onClick={() => handleRemoveProduct(product)}
          >
            remove item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
