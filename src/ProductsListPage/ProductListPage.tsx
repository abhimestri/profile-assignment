import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard/ProductCard";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../utils/auth";
import notify from "../Components/Notify/Notify";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Api";

export interface ProductProps {
  name: string;
  image: string;
  description: string;
  price: number;
  qty?: number;
  id: string;
}

const ProductListPage = () => {
  const [productList, setProductList] = useState<Array<ProductProps>>([]);
  const [productsinCart, setProductsInCart] = useState<Array<string>>([]);

  const uid: any = localStorage?.getItem("uid");
  const docRef = doc(db, "Users", uid);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productList?.length && uid) {
      getProducts()?.then((response: any) => {
        setProductList([...response]);
      });
    } else if (!uid) {
      navigate("/login");
    }
  }, [uid, navigate, productList]);

  const handleAddToCart = async (product: any) => {
    notify({ text: "Adding product to cart..." });
    try {
      const data = await getDoc(docRef);
      if (!data?.exists()) {
        await setDoc(docRef, {
          products: [product],
        });
      } else {
        await updateDoc(docRef, {
          products: arrayUnion(product),
        });
      }
      setProductsInCart([
        ...data?.data()?.products?.map((product: any) => product?.id),
      ]);
      notify({ text: "Product added to cart!", type: "success" });
    } catch (error) {
      notify({ text: "something went wrong!", type: "error" });
    }
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!productsinCart?.length) {
        try {
          const data = await getDoc(docRef);
          const idList = data
            ?.data()
            ?.products?.map((product: any) => product?.id);
          setProductsInCart([...idList]);
        } catch (error) {}
      }
    };
    fetchCartProducts();
  }, [docRef]);

  console.log({ productsinCart });

  return (
    <div className="grid grid-cols-12 gap-6 gap-x-8 p-10">
      {productList?.map((product: ProductProps) => {
        const alreadyInCart =
          productsinCart?.filter((id: any) => id === product?.id)?.length >= 1;
        return (
          <ProductCard
            name={product?.name}
            description={product?.description}
            image={product?.image}
            price={product?.price}
            onAddToCart={() => handleAddToCart(product)}
            alreadyInCart={alreadyInCart}
          />
        );
      })}
    </div>
  );
};

export default ProductListPage;
