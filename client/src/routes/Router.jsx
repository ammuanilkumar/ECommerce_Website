import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./../pages/userPages/LoginPage";
import { SignupPage } from "./../pages/userPages/SignupPage";
import { RootLayout } from "../layouts/RootLayout";
import { AboutUsPage } from "../pages/webpages/AboutUsPage";
import { ProductPage } from "../pages/userPages/ProductPage";
import { CartPage } from "../pages/userPages/CartPage";
import { UserLayout } from "../layouts/UserLayout";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { HomeRoot } from "../pages/root/HomeRoot";
import { UserHome } from "../pages/userPages/UserHome";
import { UserProfile } from "../pages/userPages/UserProfile";
import { OrderDetails } from "../pages/userPages/OrderDetails";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { WishlistPage } from "../pages/userPages/Wishlistpage";
import { AdminAuth } from "./protectedRoutes/AdminAuth";
import { AdminLoginPage } from "./../pages/adminPages/AdminLogin";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminProducts } from "../pages/adminPages/AdminProducts";
import AdminProfile from "../pages/adminPages/AdminProfile";
import AdminCreateProduct from "../pages/adminPages/AdminCreateProduct";
import AdminDElAndUpdate from "../pages/adminPages/AdminDElAndUpdate";
import AdminUserOrder from "../pages/adminPages/AdminUserOrder";
import AdminUserDetails from "../pages/adminPages/AdminUserDetails";
import { AdminLayout } from "../layouts/AdminLayout";
import { CancelPage } from "../pages/userPages/CancelPage";
import { SuccessPage } from "../pages/userPages/SuccessPage";
import { UpdateAdminProfile } from "../pages/adminPages/UpdateAdminProfile";
import { UpdateProfileForm } from "../pages/userPages/UpdateProfileForm";
import { SellerAuth } from "./protectedRoutes/SellerAuth";
import { SellerLoginPage } from "../pages/sellerpages/SellerLoginPage";
import { SellerProducts } from "../pages/sellerpages/SellerProducts";
import SellerUserOrdes from "../pages/sellerpages/SellerUserOrdes";
import SellerDelAndUpdate from "../pages/sellerpages/SellerDelAndUpdate";
import SellerProfile from "../pages/sellerpages/SellerProfile";
import ProductDetails from "../pages/userPages/ProductDetails";
import SellerLayout from "../layouts/SellerLayout"; 
import SellerCreateProduct from "../pages/sellerpages/SellerCreateProduct";

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
      {
        path: "product",
        element: <ProductPage />,
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
      {
        path: "wishlist",

        element: <WishlistPage />,
      },
      {
        path: "profile-update",

        element: <UpdateProfileForm />,
      },

      {
        path: "payment",
        children: [
          {
            path: "success",
            element: <SuccessPage></SuccessPage>,
          },
          {
            path: "cancel",
            element: <CancelPage />,
          },
        ],
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
        <AdminLayout />
      </AdminAuth>
    ),
    children: [
      {
        path: "products",
        element: <AdminProducts />,
      },

      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "create-product",
        element: <AdminCreateProduct />,
      },
      {
        path: "delete-and-update",
        element: <AdminDElAndUpdate />,
      },
      {
        path: "user-orders",
        element: <AdminUserOrder />,
      },
      {
        path: "user-details",
        element: <AdminUserDetails />,
      },
      {
        path: "user-details",
        element: <AdminUserDetails />,
      },
      {
        path: "user-details",
        element: <AdminUserDetails />,
      },
      {
        path: "update-admin-details",
        element: <UpdateAdminProfile />,
      },
    ],
  },
  {
    path: "sellerlogin",
    element: <SellerLoginPage />,
  },
  {
    path: "seller",
    element: (
      <SellerAuth>
        <SellerLayout />
      </SellerAuth>
    ),
    children: [
      {
        path: "products",
        element: <SellerProducts />,
      },
      {
        path: "create-product",
        element: <SellerCreateProduct/>,
      },
      {
        path: "delete-and-update",
        element: <SellerDelAndUpdate />,
      },
      {
        path: "user-orders",
        element: <SellerUserOrdes />,
      },
      {
        path: "profile",
        element: <SellerProfile />,
      },
    ],
  },
]);
