import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa"; // Importing icons
import "../style/adminConferences.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import DotLoader from "../../utils/loader/DotLoader";

export default function AdminConferences() {
  const [conferences, setConferences] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)



  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/conferences")
      .then((res) => { setConferences(res.data); setLoader(false) })
      .catch(() => { toast.error("Error fetching conferences!"); setLoader(false) });

  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoader(true)
    if (editId) {
      await axiosInstance.put(`/conferences/${editId}`, formData);
      setEditId(null);
      toast.success("Data updated successfully!")

    } else {
      await axiosInstance.post("/conferences", formData);
      toast.success("New data added!");
    }

    axiosInstance.get("/conferences").then((res) => setConferences(res.data));
    setFormData({ title: "", description: "" });
    setBtnLoader(false)
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
        await axiosInstance.delete(`/conferences/${id}`);
        setConferences(conferences.filter((item) => item._id !== id));
        toast.success("Data deleted successfully!")
      }
    })
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
  };

  return (
    <div className="admin-conferences">
      <h2>Manage Conferences</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Conference Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Conference Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <button type="submit">{btnLoader ? <DotLoader /> : editId ? "Update Conference" : "Add Conference"} </button>
      </form>

      {/* List of Conferences */}
      {loader ? <DotLoader /> : <ul>
        {conferences.map((item) => (
          <li key={item._id}>
            <h5><FaCalendarAlt className="icon" /> {item.title}</h5>
            <p>{item.description}</p>
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
      </ul>}
    </div>
  );
}
