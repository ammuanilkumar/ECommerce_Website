import React from "react";
import { Footer } from "../components/Footer";
import { AdminHeader } from "../components/admin/AdminHeader"; // Replace with Admin-specific header

import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader /> 
      
      <div className="flex">
    
        
        <div className="admin-content min-h-96 flex-grow p-4">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};







