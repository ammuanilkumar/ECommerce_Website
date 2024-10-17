import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./../pages/userPages/LoginPage";
import { SignupPage } from "./../pages/userPages/SignupPage";
import { RootLayout } from "../layouts/RootLayout";
import AboutUsPage from "../pages/webpages/aboutUsPage";
import { ProductDetails } from "../pages/userPages/ProductDetails";
import { ProductPage } from "../pages/userPages/ProductPage";
import { CartPage } from "../pages/userPages/CartPage";
import { UserLayout } from "../layouts/UserLayout";
import { ErrorPage } from "../pages/errorPage/errorPage";
import { UserAuth } from "./protectedRoutes/userAuth";

import HomeRoot from "../pages/root/HomeRoot";
import UserHome from "../pages/userPages/UserHome";
import { UserProfile}  from "../pages/userPages/UserProfile";
import OrderDetails from "../pages/userPages/OrderDetails";
// import { Offers } from "../pages/userPages/Offers"; // Added this import

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeRoot />,
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "user",
  
    element: (
      <UserAuth>
        <UserLayout />
      </UserAuth>
    ),
    children: [
      {
        path: "home",
        element: <UserHome />,
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
      {
        path: "profile",
        element: <UserProfile/>,
      },
      {
        path: "/user/orderdetails",
        element: <OrderDetails />,

      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "product-detail",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);
