import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaTrophy, FaBook, FaUsersCog, FaImages } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "../style/adminstats.css";
import axiosInstance from "../../utils/axiosInstance";

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalAcademics: 0,
    totalAchievements: 0,
    totalPublications: 0,
    totalConferences: 0,
    totalImages: 0,
  });

  useEffect(() => {
    axiosInstance
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch(() => console.error("Error fetching stats"));
  }, []);

  // Bar Chart Data
  const barData = [
    { name: "Acad", value: stats.totalAcademics },
    { name: "Achievements", value: stats.totalAchievements },
    { name: "Publications", value: stats.totalPublications },
    { name: "Conferences", value: stats.totalConferences },
    { name: "Images", value: stats.totalImages },
  ];

  // Pie Chart Data
  const pieData = [
    { name: "Academics", value: stats.totalAcademics },
    { name: "Achievements", value: stats.totalAchievements },
    { name: "Publications", value: stats.totalPublications },
    { name: "Conferences", value: stats.totalConferences },
    { name: "Images", value: stats.totalImages },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d84315"];

  return (
    <div className="admin-stats">
      <h2>Admin Dashboard</h2>

      <div className="stats-container">
        <div className="stat-card"><FaUsersCog className="stat-icon" /><h3>{stats.totalAcademics}</h3><p>Academics</p></div>
        <div className="stat-card"><FaTrophy className="stat-icon" /><h3>{stats.totalAchievements}</h3><p>Achievements</p></div>
        <div className="stat-card"><FaBook className="stat-icon" /><h3>{stats.totalPublications}</h3><p>Publications</p></div>
        <div className="stat-card"><FaUsers className="stat-icon" /><h3>{stats.totalConferences}</h3><p>Conferences</p></div>
        <div className="stat-card"><FaImages className="stat-icon" /><h3>{stats.totalImages}</h3><p>Gallery Images</p></div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Bar Chart */}
        <div className="chart">
          <h3>Statistics Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart">
          <h3>Data Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
