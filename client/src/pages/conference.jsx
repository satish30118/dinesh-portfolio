import React, { useEffect, useState } from "react";
import "../style/conference.css";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../utils/loader/Spinner";

// const conferenceData = [
//   {
//     title: "Hybrid Electrolyte for Water Powered Safe and Affordable Zinc-Sulfur Battery",
//     description:
//       "Presented poster in International Conference on Green Chemistry (ICGC-2023), University of Ladakh, Ladakh, India, July 3rd - 5th, 2023.",
//   },
//   {
//     title: "Water Powered Safe and Affordable Zinc-Sulfur Battery",
//     description:
//       "Institute Research Day Celebrations 2023 at IIT Roorkee, Uttarakhand, India, March 14th, 2023.",
//   },
//   {
//     title: "Water Powered Safe and Affordable Zinc-Sulfur Battery",
//     description:
//       "Uttarakhand Industry exhibition “Uttarakhand Udyog Mahotsav (UKUM 2023)” - Runner-up in the poster session. Quantum University, Roorkee, Uttarakhand, India, March 18th - 20th, 2023.",
//   },
//   {
//     title: "Recent Advancements in Zinc-Sulfur Battery",
//     description:
//       "National conference on Energy Materials and Devices (NC-EMAD-2022), IIT Jodhpur, Rajasthan, India, Dec 16-18, 2022.",
//   },
//   {
//     title: "Overview of Recent Progress in Aqueous Zinc-Sulfur Battery",
//     description:
//       "International Conference on Chemical Engineering: Enabling Transition Towards Sustainable Future (ChemTSF 2022), IIT Roorkee, Uttarakhand, India, Sept 8-10, 2022.",
//   },
// ];

export default function Conference() {
  const [conferenceData, setConferences] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/conferences")
      .then((res) => setConferences(res.data))
      .catch(() => toast.error("Error fetching conferences!"));
    setLoader(false)

  }, []);
  return (
    <div className="conference-container">
      <header className="conference-header">
        <h1>CONFERENCE ATTENDED</h1>
        <div className="overlay"></div>
        <img
          src="https://plus.unsplash.com/premium_photo-1666896192348-dbd2afd19b07?w=500&auto=format&fit=crop&q=60"
          alt="Conference"
          loading="lazy"
        />
      </header>
      {loader ? <Spinner /> : <section className="conference-list">
        {conferenceData.map((conf, index) => (
          <div key={index} className="conference-item">
            <h3>{conf.title}</h3>
            <p>{conf.description}</p>
          </div>
        ))}
      </section>}

    </div>
  );
}
