import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaBookOpen } from "react-icons/fa"; // Importing icons
import "../style/adminpublications.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import DotLoader from "../../utils/loader/DotLoader";

export default function AdminPublications() {
  const [publications, setPublications] = useState([]);
  const [formData, setFormData] = useState({ title: "", authors: "", journal: "", link: "" });
  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)



  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/publications")
      .then((res) => { setPublications(res.data); setLoader(false) })
      .catch(() => { toast.error("Error fetching publications!"); setLoader(false) });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoader(true)
    if (editId) {
      await axiosInstance.put(`/publications/${editId}`, formData);
      setEditId(null);
      toast.success("Data updated successfully!")

    } else {
      await axiosInstance.post("/publications", formData);
    }

    axiosInstance.get("/publications").then((res) => setPublications(res.data));
    setFormData({ title: "", authors: "", journal: "", link: "" });
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
        await axiosInstance.delete(`/publications/${id}`);
        setPublications(publications.filter((item) => item._id !== id));
        toast.success("Data deleted successfully!")
      }
    })
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
  };

  return (
    <div className="admin-publications">
      <h2>Manage Publications</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Authors"
          value={formData.authors}
          onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Journal"
          value={formData.journal}
          onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="DOI Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
        />
        <button type="submit">{btnLoader ? <DotLoader /> : editId ? "Update Publication" : "Add Publication"} </button>
      </form>

      {/* List of Publications */}
      {loader ? <DotLoader /> : <ul>
        {publications.map((item) => (
          <li key={item._id}>
            <h5><FaBookOpen className="icon" /> {item.title}</h5>
            <p><strong>Authors:</strong> {item.authors}</p>
            <p><strong>Journal:</strong> {item.journal}</p>
            <p>

              <a href={item.link} target="_blank" rel="noopener noreferrer"><strong> Read More →</strong></a>
            </p>
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
