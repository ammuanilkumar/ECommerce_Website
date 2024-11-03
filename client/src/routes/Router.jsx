// import { createBrowserRouter } from "react-router-dom";

// import { LoginPage } from "./../pages/userPages/LoginPage";
// import { SignupPage } from "./../pages/userPages/SignupPage";
// import { RootLayout } from "../layouts/RootLayout";
// import { AboutUsPage } from "../pages/webpages/AboutUsPage";
// import { ProductDetails } from "../pages/userPages/ProductDetails";
// import { ProductPage } from "../pages/userPages/ProductPage";
// import { CartPage } from "../pages/userPages/CartPage";
// import { UserLayout } from "../layouts/UserLayout";
// import { ErrorPage } from "../pages/errorPage/ErrorPage";

// import { HomeRoot } from "../pages/root/HomeRoot";
// import { UserHome } from "../pages/userPages/UserHome";
// import { UserProfile } from "../pages/userPages/UserProfile";
// import { OrderDetails } from "../pages/userPages/OrderDetails";
// import { UserAuth } from "./protectedRoutes/UserAuth";
// // import { AdminAuth } from "./protectedRoutes/AdminAuth";
//  import {  AdminLoginPage  } from  "./../pages/adminPages/AdminLogin";


// // import { Offers } from "../pages/userPages/Offers"; // Added this import

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     errorElement: <ErrorPage />,
//     element: <RootLayout />,
//     children: [
//       {
//         path: "",
//         element: <HomeRoot />,
//       },
//       {
//         path: "about",
//         element: <AboutUsPage />,
//       },
//       {
//         path: "login",
//         element: <LoginPage />,
//       },
//       {
//         path: "signup",
//         element: <SignupPage />,
//       },
//     ],
//   },
//   {
//     path: "user",

//     element: (
//       <UserAuth>
//         <UserLayout />
//       </UserAuth>
//     ),
//     children: [
//       {
//         path: "home",
//         element: <UserHome />,
//       },
//       {
//         path: "about",
//         element: <AboutUsPage />,
//       },
//       {
//         path: "profile",
//         element: <UserProfile />,
//       },
//       {
//         path: "orderdetails",
//         element: <OrderDetails />,
//       },
//       {
//         path: "product",
//         element: <ProductPage />,
//       },
//       {
//         path: "product-details/:id",
//         element: <ProductDetails />,
//       },
//       {
//         path: "cart",
//         element: <CartPage />,
//       },
//     ],
//     // nathaa error anuu  slack aych dk verum 
//   },
//   // {
//   //   path: "adminlogin",
//   //   // element: <AdminLoginPage />,
//   // },
//   // path: "admin",
//   // element: (
//   //   <AdminAuth>
//   //     <AdminLayout />
//   //   </AdminAuth>
//   // ),

//   // evidaa   nee bakkii set akkanamm emtoo  ok
// ]);


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

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        path: "/",
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
]);
