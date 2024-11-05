import React from "react";
import { Footer } from "../components/Footer";
import { AdminHeader } from "../components/admin/AdminHeader"; // Replace with Admin-specific header
i//mport { AdminSidebar } from "../components/admin/AdminSidebar"; // Optional: Admin sidebar
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader /> {/* Admin-specific header */}
      
      <div className="flex">
        <AdminSidebar /> {/* Optional: Admin sidebar for navigation */}
        
        <div className="admin-content min-h-96 flex-grow p-4">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};








// import React from "react";
// import { Footer } from "../components/Footer";
// import { UserHeader } from "../components/user/UserHeader";
// import { Outlet } from "react-router-dom";  

// export const AdminLayout = () => {
//   return (
//     <div>
//       <UserHeader />
//       <div className="min-h-96">
//       <Outlet />
//       </div>

//       <Footer />
//     </div>
//   );
// };