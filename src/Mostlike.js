import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
const Mostlike = () => {
  const [selectedImages, setSelectedImages] = useState([]);
let Navigate =useNavigate()
  useEffect(() => {
    const imagesData = localStorage.getItem("imagesData");
    if (imagesData) {
      setSelectedImages(JSON.parse(imagesData));
    }
  }, []);

  const sortedImages = selectedImages.sort((a, b) => b.likes - a.likes);
  const mostLikedImages = sortedImages.slice(0, 5);

  return (
    <section>
         <div className="button-container">
        <button onClick={()=>Navigate("/Home")}>Home</button>
        <button onClick={()=>Navigate("/Recent")} >Recent Images</button>
      </div>
      <h2>Most Liked Images</h2>
      <div className="card-container">
        {mostLikedImages &&
          mostLikedImages.map((image, index) => {
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

export default Mostlike;
