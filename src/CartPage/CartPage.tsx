import React, { useEffect, useState } from "react";
import Button from "../Components/Button/Button";
import { ProductProps } from "../ProductsListPage/ProductListPage";
import { doc, getDoc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "../utils/auth";
import CartProductCard from "../Components/CartProductCard/CartProductCard";
import { useNavigate } from "react-router-dom";
import notify from "../Components/Notify/Notify";
import { calculateDiscountedValue, calculateTotalPrice } from "../utils/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartPage = () => {
  const [productsList, setProductsList] = useState<Array<ProductProps>>([]);
  const [currentDiscount, setCurrentDiscount] = useState<any>({
    type: "flat",
    value: 200,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const uid: any = localStorage?.getItem("uid");
  const docRef = doc(db, "Users", uid);
  const navigate = useNavigate();

  const handleRemoveProduct = async (product: any) => {
    setLoading(true);
    try {
      await updateDoc(docRef, {
        products: arrayRemove(product),
      });
      notify({ text: "Product removed from cart", type: "success" });
    } catch (error) {
      notify({ text: "Something went wrong", type: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getDoc(docRef);
        setProductsList([...data?.data()?.products]);
        setLoading(false);
      } catch (error) {
        notify({ text: "Something went wrong", type: "error" });
        setLoading(false);
      }
    };
    fetchProducts();
  }, [docRef, productsList]);

  const getTotalPrice: any = () => {
    return productsList?.reduce(
      (acc, red) => acc + Number(red?.price) * Number(red?.qty),
      0
    );
  };

  const handleUpdateQty = async (updatedProduct: ProductProps) => {
    notify({ text: "Updating quantity..." });
    try {
      const userData = await getDoc(docRef);
      const products = userData?.data()?.products;
      if (userData?.exists()) {
        const productIndex = products.findIndex(
          (product: any) => product.id === updatedProduct.id
        );
        products[productIndex] = {
          ...updatedProduct,
        };
      }
      await updateDoc(docRef, {
        products,
      });
      notify({ text: "Quantity updated", type: "success" });
    } catch (error) {
      notify({ text: "Something went wrong", type: "error" });
    }
  };

  return (
    <div className="md:flex gap-x-6 p-10">
      {loading ? (
        <div>
          <Skeleton
            style={{ width: "60vw", height: "240px", marginBottom: "20px" }}
            count={6}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-y-8 mb-8 md:w-[70vw]">
          {productsList?.length ? (
            productsList?.map((product: ProductProps) => {
              return (
                <CartProductCard
                  product={product}
                  handleRemoveProduct={handleRemoveProduct}
                  handleUpdateQty={handleUpdateQty}
                />
              );
            })
          ) : (
            <div className="w-full light-border p-14 md:w-[70vw]">
              <p className="font-medium text-[24px] text-center flex flex-col justify-center">
                No products in your cart{" "}
                <span
                  className="text-[16px] font-normal underline cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Add some
                </span>
              </p>
            </div>
          )}
        </div>
      )}
      {loading ? (
        <div>
          <Skeleton count={1} style={{ height: "240px", width: "30vw" }} />
        </div>
      ) : (
        <div className="light-border sticky top-4 p-6 h-[40%] w-full md:w-[30vw] !mt-0">
          <p className="py-2 font-medium">Price Details</p>
          <hr className="w-[100%] h-[2px] bg-[ccc]" />
          <div className="py-3 flex justify-between">
            <p>Price ({productsList?.length} items)</p>
            <p>${Number(getTotalPrice())?.toFixed(2)}</p>
          </div>
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
                disabled={getTotalPrice() < 200}
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
                  getTotalPrice() <= 200 ? "!cursor-not-allowed" : ""
                }`}
              >
                <option value="d10">10%</option>
                <option value="f200">$200</option>
              </select>
            </div>
          </div>
          <hr className="w-[100%] h-[2px] bg-[ccc]" />
          <div className="py-2 flex justify-between">
            <p>Total amount</p>
            <p>
              $
              {getTotalPrice() < 200
                ? Number(getTotalPrice())?.toFixed(2)
                : Number(
                    calculateTotalPrice(getTotalPrice(), currentDiscount)
                  )?.toFixed(2)}
            </p>
          </div>
          {getTotalPrice() > 200 ? (
            <>
              <hr className="w-[100%] h-[2px] bg-[ccc]" />
              <div className="py-2 text-green font-semibold mt-8">
                <p>
                  You will save $
                  {Number(
                    calculateDiscountedValue(getTotalPrice(), currentDiscount)
                  )?.toFixed(2)}{" "}
                  on this order
                </p>
              </div>{" "}
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
