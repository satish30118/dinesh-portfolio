import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "../style/AdminDashboard.css";
import axiosInstance from "../../utils/axiosInstance";
import { FaBars } from "react-icons/fa"; // Mobile Menu Icon

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Session Expired! Please login again.");
      navigate("/admin/login");
      return;
    }

    axiosInstance.get("/admin/dashboard")
      .then((res) => {
        if (res.data.isAdmin) {
          setIsAdmin(true);
        } else {
          toast.error("Access Denied!");
          navigate("/admin/login");
        }
      })
      .catch(() => {
        toast.error("Session Expired! Please login again.");
        navigate("/admin/login");
      });
  }, [navigate]);

  if (isAdmin === null) {
    return <h2>Verifying Admin...</h2>;
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-leftbar`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
