import axios from "axios";
import { ProductProps } from "../ProductsListPage/ProductListPage";

export const getProducts = async () => {
  return await axios.get("https://dummyjson.com/products")?.then((res: any) => {
    const products: Array<ProductProps> = res?.data?.products?.map(
      (product: any) => {
        return {
          name: product?.title,
          image: product?.thumbnail,
          description: product?.description,
          price: product?.price,
          id: product?.id,
          qty: 1,
        };
      }
    );
    return products;
  });
};
