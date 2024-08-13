import "./App.css";
import ProductListPage from "./ProductsListPage/ProductListPage";
import Auth from "./Auth";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./CartPage/CartPage";
import Main from "./Main/Main";

const App = () => {
  setTimeout(() => {
    localStorage.removeItem("uid");
  }, 3600000);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { path: "/", element: <ProductListPage /> },
        { path: "/cart-page", element: <CartPage /> },
      ],
    },
    { path: "/login", element: <Auth /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
