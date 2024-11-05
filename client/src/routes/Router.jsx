import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./../pages/userPages/LoginPage";
import { SignupPage } from "./../pages/userPages/SignupPage";
import { RootLayout } from "../layouts/RootLayout";
import { AboutUsPage } from "../pages/webpages/AboutUsPage";
import { ProductDetails } from "../pages/userPages/ProductDetails";
import { ProductPage } from "../pages/userPages/ProductPage";
import { CartPage } from "../pages/userPages/CartPage";
import { UserLayout } from "../layouts/UserLayout";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { HomeRoot } from "../pages/root/HomeRoot";
import { UserHome } from "../pages/userPages/UserHome";
import { UserProfile } from "../pages/userPages/UserProfile";
import { OrderDetails } from "../pages/userPages/OrderDetails";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { AdminLoginPage } from "./../pages/adminPages/AdminLogin";
import { AdminAuth } from "./protectedRoutes/AdminAuth";
import {HomeAdmin } from "./../pages/adminPages/HomeAdmin";
import { AdminProfile } from "./../pages/adminPages/AdminProfile";
import {AdminProductPage } from "./../pages/adminPages/AdminProductPage";

import {AdminProductDetails} from "./../pages/adminPages/AdminProductDetails";

import {CreateProduct} from "./../pages/adminPages/CreateProduct";
import {CrudProduct} from "./../pages/adminPages/CrudProduct";
import {AdminOrderDetails} from "../pages/adminPages/AdminOrderDetails";
import {UpdateProduct} from "./../pages/adminPages/UpdateProduct";

import { GetUsersList } from "./../pages/adminPages/GetUserList"; // For named export
// import{AdminDashboardLayout} from "../layouts/AdminLayout"; // For named"
import { AdminDashboardLayout } from "../layouts/AdminDashboardLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
        element: <UserProfile />,
      },
      {
        path: "orderdetails",
        element: <OrderDetails />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "adminlogin",
    element: <AdminLoginPage />,
  },
  {
    path: "admin",
    element: (
      <AdminAuth>
        <UserLayout />
       </AdminAuth> 
   
    ),
    children: [
      {
        path: "home",
        element: <HomeAdmin />,
      },
      
      {
        path: "profile",
        element: <AdminProfile />,
      },
      
      {
        path: "product",
        element: <AdminProductPage />,
      },
      {
        path: "product-details/:id",
        element: <AdminProductDetails />,
      },
     
    ],
  },


  {
    path: "dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "crud-product",
        element: <CrudProduct />,
      },
      {
        path: "user-orders",
        element: <AdminOrderDetails />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "get-users-details",
        element: <GetUsersList />,
      },
    ],
  },
])
