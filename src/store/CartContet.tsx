import { createContext } from "react";

export const CartContext = createContext({
  totalItemsInCart: 0,
  setTotalItemsInCart: (data: any) => data,
});
