import React from "react";
import { Footer } from "../components/Footer";

import { Outlet } from "react-router-dom";
import { SellerHeader } from "../components/seller/SellerHeader";

export const SellerLayout = () => {
  return (
    <div className="admin-layout">
      <SellerHeader /> 
      
      <div className="flex">
    
        
        <div className="admin-content min-h-96 flex-grow p-4">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};







