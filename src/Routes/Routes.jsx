import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Products from "../Layout/Products";
import ProductList from "../Pages/AllProducts/ProductsList/ProductList";
import ProductDetails from "../Pages/AllProducts/ProductsList/ProductDetails";
import AddProduct from "../Pages/AllProducts/AddProduct/AddProduct";
import Cart from "../Pages/AllProducts/Cart/Cart";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Payment/PaymentHistory";
import Category from "../Pages/Category/Category";
import AddCategory from "../Pages/Category/AddCategory";
import CategoryList from "../Layout/CategoryList";
import CategoryProducts from "../Pages/Category/CategoryProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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

      {
        path: "payments",
        element: <Payment />,
      },

      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },

      {
        path: "categories/:categoryName", // Dynamic route for category
        element: <CategoryProducts />, // Component to handle displaying products by category
      },
    ],
  },

  {
    path: "/categoryList",
    element: <CategoryList />,
    children: [
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "addCategory",
        element: <AddCategory />,
      },
    ],
  },
]);
