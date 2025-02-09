import React, { use, useEffect, useState } from "react";
import "../style/achievement.css"; // Import external CSS
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../utils/loader/Spinner";

// const achievements = [
//   "Recipient of India’s prestigious Ph.D. fellowship, Prime Minister Research Fellowship.",
//   "Recipient of DST NIDHI-PRAYAS grant for startup incubation.",
//   "Qualified IIT JAM 2017 and GATE Chemistry 2019.",
//   "Qualified CSIR-NET Chemistry 2022.",
//   "Finalist in 'Tata Steel MaterialNEXT 4.0' flagship open innovation program. Our Aqueous Zn-S battery research was awarded INR 25K for its innovative approach.",
// ];

export default function Achievement() {
  const [achievements, setAchievements] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/achievements")
      .then((res) => {setAchievements(res.data);setLoader(false)})
      .catch(() => {toast.error("Error fetching achievements!");setLoader(false)});

  }, []);
  return (
    <div className="achievement-container">
      <header className="achievement-header">
        <h1>AWARDS & ACHIEVEMENTS</h1>
        <div className="overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1539667468225-eebb663053e6?w=500&auto=format&fit=crop&q=60"
          alt="Awards & Achievements"
          loading="lazy"
        />
      </header>
      {loader ? <Spinner /> : <section className="achievement-list">
        {achievements.map((award) => (
          <div key={award._id} className="achievement-item">
            <span className="award-icon">🏆</span>
            <p>{award.title}</p>
          </div>
        ))}
      </section>}

    </div>
  );
}
