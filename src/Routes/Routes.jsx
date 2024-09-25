import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Products from "../Layout/Products";
import ProductList from "../Pages/AllProducts/ProductsList/ProductList";
import ProductDetails from "../Pages/AllProducts/ProductsList/ProductDetails";
import AddProduct from "../Pages/AllProducts/AddProduct/AddProduct";
import Cart from "../Pages/AllProducts/Cart/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // {
      //   path: "/menu",
      //   element: <Menu />,
      // },

      // {
      //   path: "/order/:category",
      //   element: <Order />,
      // },
    ],
  },

  {
    path: "/products",
    element: <Products />,
    children: [
      // normal user routes
      {
        path: "allProducts",
        element: <ProductList />,
      },

      // Route for viewing single product details
      {
        path: "details/:productId", // Route with productId parameter
        element: <ProductDetails />,
      },

      {
        path: "addProduct",
        element: <AddProduct />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      //     {
      //       path: "payment",
      //       element: <Payment />,
      //     },

      //     {
      //       path: "paymentHistory",
      //       element: <PaymentHistory />,
      //     },

      //     {
      //       path: "manageItems",
      //       element: <ManageItems />,
      //     },

      //     {
      //       path: "updateItem/:id",
      //       element: <UpdateItem />,
      //       // loader: ({ params }) =>
      //       //   // fetch(`http://localhost:5000/menu/${params.id}`),
      //       //   fetch(
      //       //     `https://bistro-boss-server-xi-fawn.vercel.app/menu/${params.id}`
      //       //   ),
      //     },

      //     {
      //       path: "users",
      //       element: <AllUsers />,
      //     },
    ],
  },
]);
