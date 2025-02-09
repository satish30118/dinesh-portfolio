import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit, FaKey, FaSave } from "react-icons/fa"; // Icons
import "../style/adminprofile.css"; // Import Styles
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import DotLoader from "../../utils/loader/DotLoader";

export default function AdminProfile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [loader, setLoader] = useState(false)
  const [btn1Loader, setBtn1Loader] = useState(false)
  const [btn2Loader, setBtn2Loader] = useState(false)



  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/admin/profile", { withCredentials: true })
      .then((res) => { setProfile(res.data); setLoader(false) })
      .catch(() => { toast.error("Error fetching profile!"); setLoader(false) });
  }, []);

  const handleProfileUpdate = async () => {
    try {
      setBtn1Loader(true)
      await axiosInstance.put("/admin/profile", profile, { withCredentials: true });
      toast.success("Profile updated successfully!");
      setBtn1Loader(false)
    } catch (error) {
      toast.error("Profile update failed!");
      setBtn1Loader(false)
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordData.oldPassword || !passwordData.newPassword) return toast.warn("Fill all fields!");

    try {
      setBtn2Loader(true)
      await axiosInstance.put("/admin/change-password", passwordData, { withCredentials: true });
      toast.success("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setBtn2Loader(false)
    } catch (error) {
      toast.error("Current password not matched!");
      setBtn2Loader(false)
    }
  };

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>

      {/* Profile Update Section */}
      {loader ? <DotLoader /> : <div className="profile-section">
        <label>Name:</label>
        <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

        <label>Email:</label>
        <input type="email" value={profile.email} disabled />

        <button onClick={handleProfileUpdate} className="btn-save">
          {btn1Loader ? <DotLoader /> : <><FaSave /> Save Profile</>}

        </button>
      </div>}

      {/* Password Change Section */}
      <div className="password-section">
        <h3>Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
          />
          <button type="submit" className="btn-change">
            {btn2Loader ? <DotLoader /> : <> <FaKey /> Change Password</>}

          </button>
        </form>
      </div>
    </div>
  );
}
