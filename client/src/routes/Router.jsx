import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./../pages/userPages/HomePage";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
    element: (
      <UserAuth>
        <UserLayout />
      </UserAuth>
    ),
    path: "user",
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "product",

        element: <ProductPage />,
      },
      {
        path: "offers",
        element: <offers />,
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
