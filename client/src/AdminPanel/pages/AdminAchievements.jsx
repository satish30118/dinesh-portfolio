import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTrophy } from "react-icons/fa"; // Importing icons
import "../style/adminachievements.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [formData, setFormData] = useState({ title: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axiosInstance.get("/achievements")
      .then((res) => setAchievements(res.data))
      .catch(() => toast.error("Error fetching achievements!"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axiosInstance.put(`/achievements/${editId}`, formData);
      setEditId(null);
      toast.success("Data updated successfully!")
    } else {
      await axiosInstance.post("/achievements", formData);
      toast.success("New achievement added!");
    }

    axiosInstance.get("/achievements").then((res) => setAchievements(res.data));
    setFormData({ title: "" });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosInstance.delete(`/achievements/${id}`);
        setAchievements(achievements.filter((item) => item._id !== id));
        toast.success("Data deleted successfully!")
      }
    })
    };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
  };

  return (
    <div className="admin-achievements">
      <h2>Manage Achievements</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Achievement Title"
          value={formData.title}
          onChange={(e) => setFormData({ title: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Achievement</button>
      </form>

      {/* List of Achievements */}
      <ul>
        {achievements.map((item) => (
          <li key={item._id}>
            <p><FaTrophy className="icon" /> {item.title}</p>
            <div className="action-buttons">
              <button onClick={() => handleEdit(item)} id="btn-edit">
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(item._id)} id="btn-delete">
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
