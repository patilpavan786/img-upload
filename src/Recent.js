import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./style.css"
const Recent = () => {
  const [latestImages, setLatestImages] = useState([]);
  let Navigate =useNavigate()
  useEffect(() => {
    const imagesData = localStorage.getItem("imagesData");
    if (imagesData) {
      const parsedImagesData = JSON.parse(imagesData);
      const sortedImages = parsedImagesData.sort((a, b) => b.date - a.date);
      const latestImages = sortedImages.slice(0, 5);
      setLatestImages(latestImages);
    }
  }, []);

  return (
    <section>
         <div className="button-container">
         <button onClick={()=>Navigate("/Home")}>Home</button>
         <button onClick={()=>Navigate("/Mostlike")} >Most like</button>
    </div>
      <h2>Recent Images</h2>
      <div className="card-container">
        {latestImages.map((image, index) => {
          return (
            <div key={image.url} className="card">
              <img src={image.url} alt="upload" />
              <div className="card-info">
                <p className="upload-time">Uploaded at {image.time}</p>
                <div className="like-container">
                  <p className="like-count">{image.likes}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Recent;
