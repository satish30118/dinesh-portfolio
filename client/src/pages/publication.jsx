import React, { useEffect, useState } from "react";
import "../style/publication.css";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../utils/loader/Spinner";

// const publications = [
//   {
//     title: "Hybrid Electrolyte with Biomass-Derived Carbon Host for High-Performance Aqueous Zn-S Battery",
//     authors: "Dinesh Patel, Abhishek Dharmesh, Yash Sharma, Poonam Rani, and Ashwini Kumar Sharma",
//     journal: "Chemical Engineering Journal, 479, 2024, 147722",
//     link: "https://doi.org/10.1016/j.cej.2023.147722",
//   },
//   {
//     title: "Minireview on Aqueous Zinc–Sulfur Batteries: Recent Advances and Future Perspectives",
//     authors: "Dinesh Patel and Ashwini Kumar Sharma",
//     journal: "Energy & Fuels, 37 (15) 2023, 10897-10914",
//     link: "https://doi.org/10.1021/acs.energyfuels.3c01938",
//   },
// ];

export default function Publication() {
  const [publications, setPublications] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/publications")
      .then((res) => {setPublications(res.data); setLoader(false)})
      .catch(() => {toast.error("Error fetching publications!");setLoader(false)});
  }, []);
  return (
    <div className="publication-container">
      <header className="publication-header">
        <h1>PUBLICATIONS</h1>
        <div className="overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1546587348-d12660c30c50?w=500&auto=format&fit=crop&q=60"
          alt="Publications"
          loading="lazy"
        />
      </header>
      {
        loader ? <Spinner /> : <section className="publication-list">
          {publications.map((pub, index) => (
            <div key={index} className="publication-item">
              <h3>{pub.title}</h3>
              <p><strong>Authors:</strong> {pub.authors}</p>
              <p><strong>Journal:</strong> {pub.journal}</p>
              <a href={pub.link} target="_blank" rel="noopener noreferrer">
                Read More →
              </a>
            </div>
          ))}
        </section>
      }

    </div>
  );
}
