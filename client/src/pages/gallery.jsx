import React, { useEffect, useState } from "react";
import "../style/gallery.css";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../utils/loader/Spinner";

// const images = [
//   "../assets/gallery/g3.jpeg",
//   "../assets/gallery/g1.jpeg",
//   "../assets/gallery/g2.jpeg",
//   "../assets/gallery/g4.jpeg",
// ];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    axiosInstance.get("/gallery")
      .then((res) => setImages(res.data))
      .catch(() => toast.error("Error fetching images!"));
    setLoader(false)

  }, []);
  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>GALLERY</h1>
        <div className="overlay"></div>
        <img
          src="https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Gallery"
        />
      </header>
      {loader ? <Spinner /> : <section className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src?.imageUrl} alt={`Gallery Image ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </section>}

    </div>
  );
}
