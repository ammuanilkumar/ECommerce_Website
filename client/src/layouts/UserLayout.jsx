import React from "react";
import { Footer } from "../components/Footer";
import { UserHeader } from "../components/user/UserHeader";
import { Outlet } from "react-router-dom";  

export const UserLayout = () => {
  return (
    <div>
      <UserHeader />
      <div className="min-h-96">
      <Outlet />
      </div>

      <Footer />
    </div>
  );
};