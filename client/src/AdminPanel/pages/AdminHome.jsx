import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa"; // Save Icon
import "../style/adminhome.css"; // Import Styles
import axiosInstance from "../../utils/axiosInstance";
import DotLoader from "../../utils/loader/DotLoader";
const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000/api";

export default function AdminHome() {
  const [homeData, setHomeData] = useState({ image: "", about: "" });
  const [imagePreview, setImagePreview] = useState("");
  const [loader, setLoader] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)


  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/home").then((res) => {
      setHomeData(res.data);
      setImagePreview(res.data.image);
    });
    setLoader(false)
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setBtnLoader(true)
      const res = await axiosInstance.post("/upload", formData);
      setHomeData({ ...homeData, image: res.data.imageUrl });
      setImagePreview(res.data.imageUrl);
      toast.success("Image uploaded successfully!");
      setBtnLoader(false)

    } catch (err) {
      toast.error("Image upload failed!");
      setBtnLoader(false)

    }
  };

  const handleUpdate = () => {
    axiosInstance.put("/home", homeData)
      .then(() => toast.success("Home updated successfully!"))
      .catch(() => toast.error("Update failed!"));
  };

  return (
    <div className="admin-home">
      <h2>Manage Home Page</h2>

      {loader ? <DotLoader /> : <> {/* Image Upload & Preview */}
        <div className="image-box">
          <label>Upload Home Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={baseURL + imagePreview} alt="Preview" className="preview-img" />}
        </div>
        <br />
        {/* About Text */}
        <div className="about-section">
          <label>About Text:</label>
          <textarea
            value={homeData.about}
            onChange={(e) => setHomeData({ ...homeData, about: e.target.value })}
            placeholder="Write about yourself..."
            required
          />
        </div>

        <button onClick={handleUpdate} className="btn-save">
          {btnLoader ? <DotLoader /> : <><FaSave /> Update Home</>}
        </button></>}
    </div>
  );
}
