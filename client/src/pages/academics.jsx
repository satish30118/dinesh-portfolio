import React, { useEffect, useState } from "react";
import "../style/academics.css";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../utils/loader/Spinner";

// const academicData = [
//   {
//     degree: "Doctor of Philosophy (Ph.D.) - Chemical Engineering",
//     timeline: "[2022 - Present]",
//     institute: "Indian Institute of Technology Roorkee (IITR), India",
//     cgpa: "CGPA: 9.17/10",
//   },
//   {
//     degree: "Master of Technology (M.Sc.) – Analytical Chemistry",
//     timeline: "[2017 - 2019]",
//     institute: "Department of Chemistry, University of Mumbai, India",
//     cgpa: "CGPA: 7.21/10",
//   },
//   {
//     degree: "Bachelor of Technology (B.Sc.) – Chemistry",
//     timeline: "[2014 - 2017]",
//     institute: "Thakur College of Science and Commerce, University of Mumbai, India",
//     cgpa: "CGPA: 6.72/7",
//   },
// ];

export default function Academics() {
  const [academicData, setAcademicData] = useState([]);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/academics")
      .then((res) => setAcademicData(res.data))
      .catch(() => toast.error("Error fetching academics!"));
    setLoader(false)
  }, []);
  return (
    <div className="academics-container">
      <header className="academics-header">
        <h1>ACADEMICS</h1>
        <div className="overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1543877087-ebf71fde2be1?w=500&auto=format&fit=crop&q=60"
          alt="Academics"
          loading="lazy"
        />
      </header>
      {loader ? <Spinner /> : <section className="academics-list">
        {academicData.map((item, index) => (
          <div key={index} className="academic-item">
            <h3>{item.degree} <span className="acad-timeline">[{item.timeline}]</span></h3>
            <p>{item.institute}</p>
            <p className="cgpa">CGPA: {item.cgpa}</p>
          </div>
        ))}
      </section>}

    </div>
  );
}
