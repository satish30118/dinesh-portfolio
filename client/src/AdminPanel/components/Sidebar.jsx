import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaUserGraduate, FaTrophy, FaBook, FaUsers, FaImages,
  FaUser, FaSignOutAlt, FaChartBar, FaBars
} from "react-icons/fa";
import "./Sidebar.css";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    axiosInstance.post("/admin/logout", {}, { withCredentials: true })
      .then(() => {
        sessionStorage.removeItem("token");
        navigate("/admin/login");
        toast.success("Logout successfully!");
      });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin/dashboard/home" onClick={() => setIsOpen(false)}><FaHome /> Home</Link></li>
          <li><Link to="/admin/dashboard/academics" onClick={() => setIsOpen(false)}><FaUserGraduate /> Academics</Link></li>
          <li><Link to="/admin/dashboard/achievements" onClick={() => setIsOpen(false)}><FaTrophy /> Achievements</Link></li>
          <li><Link to="/admin/dashboard/publications" onClick={() => setIsOpen(false)}><FaBook /> Publications</Link></li>
          <li><Link to="/admin/dashboard/conferences" onClick={() => setIsOpen(false)}><FaUsers /> Conferences</Link></li>
          <li><Link to="/admin/dashboard/gallery" onClick={() => setIsOpen(false)}><FaImages /> Gallery</Link></li>
          <li><Link to="/admin/dashboard/stats" onClick={() => setIsOpen(false)}><FaChartBar /> Stats</Link></li>
          <li><Link to="/admin/dashboard/profile" onClick={() => setIsOpen(false)}><FaUser /> Profile</Link></li>
        </ul>
        <button className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );
}
