import React from "react";
import Button from "../Button/Button";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  alreadyInCart: boolean;
  onAddToCart: (data?: any) => void;
}

const ProductCard = ({
  name,
  description,
  price,
  onAddToCart,
  image,
  alreadyInCart,
}: ProductCardProps) => {
  return (
    <div className="transition ease-in-out delay-100 duration-200 flex flex-col justify-between light-border !border-[#e5e5e5] col-span-12 h-full px-4 py-6 hover:bg-[#ededed] hover:border-[#dcdcdc] sm:col-span-6 md:col-span-4 lg:col-span-3">
      <div>
        <img
          src={image}
          alt=""
          className="m-auto w-[70%] h-[70%] aspect-square"
        />
        <p className="text-[22px] font-medium line-clamp-1">{name}</p>
        <p className="line-clamp-2">{description}</p>
      </div>
      <div className="flex justify-between gap-y-10 mt-10 w-full">
        <p className="my-2 font-medium text-[18px] p-0">Price: ${price}</p>
        <Button disabled={alreadyInCart} onClick={onAddToCart}>
          {alreadyInCart ? "Already in cart" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
