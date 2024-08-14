import React, { useEffect, useState } from "react";
import Button from "../Components/Button/Button";
import { ProductProps } from "../ProductsListPage/ProductListPage";
import {
  doc,
  getDoc,
  arrayRemove,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../utils/auth";
import CartProductCard from "../Components/CartProductCard/CartProductCard";
import { useNavigate } from "react-router-dom";
import notify from "../Components/Notify/Notify";
import { calculateDiscountedValue, calculateTotalPrice } from "../utils/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getErrorMessage } from "../Auth/utils";
import PriceDetails from "./PriceDetails";

const CartPage = () => {
  const [productsList, setProductsList] = useState<Array<ProductProps>>([]);
  const [currentDiscount, setCurrentDiscount] = useState<any>({
    type: "flat",
    value: 200,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);

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
        if (data?.exists()) {
          const updatedProducts = data?.data()?.products ?? [];
          setProductsList([...updatedProducts]);
        }
        setLoading(false);
      } catch (error) {
        notify({ text: "Something went wrong", type: "error" });
        setLoading(false);
      }
    };
    fetchProducts();
    if (productsList?.length <= 0) {
      setDisabled(true);
    }
  }, [docRef, productsList]);

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

  const handleCheckout = async () => {
    if (!disabled) {
      try {
        await updateDoc(docRef, {
          products: deleteField(),
        });
        notify({
          text: "Your order has been placed, Thank you!",
          type: "success",
        });
        setProductsList([]);
      } catch (error: any) {
        notify({ text: getErrorMessage(error["code"]), type: "error" });
      }
    }
  };

  return (
    <div className="p-10 z-[-1]">
      <div className="md:flex gap-x-6">
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
                    setDisabled={setDisabled}
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
          <PriceDetails
            handleCheckout={handleCheckout}
            productsList={productsList}
            disabled={disabled}
            setCurrentDiscount={setCurrentDiscount}
            currentDiscount={currentDiscount}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
