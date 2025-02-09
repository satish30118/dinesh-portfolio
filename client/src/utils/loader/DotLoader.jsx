import React from "react";
import "./dotloader.css"; // Import CSS

export default function DotLoader() {
  return (
    <div className="loader-container">
      <div className="dots-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
