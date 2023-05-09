import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import styles from "./App.module.css";

const App = () => {
  let data = JSON.parse(localStorage.getItem("imagesData"))
  const [selectedImages, setSelectedImages] = useState(data|| []);
  const [imageCount, setImageCount] = useState(0);
  let Navigate =useNavigate()
 

  useEffect(() => {
    const imagesData = localStorage.getItem("imagesData");
    if (imagesData) {
      setSelectedImages(JSON.parse(imagesData));
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("imagesData", JSON.stringify(selectedImages));
    setImageCount(selectedImages.length);
  }, [selectedImages]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      const date = new Date();
      const uploadTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return {
        url: URL.createObjectURL(file),
        time: uploadTime,
        likes: 0,
      };
    });

    setSelectedImages((previousImages) =>
      previousImages.concat(imagesArray)
    );

    event.target.value = "";
  };

  const handleLike = (index, event) => {
    event.stopPropagation(); // stop event bubbling
    setSelectedImages((previousImages) => {
      const newImages = [...previousImages];
      newImages[index] = {
        ...newImages[index],
        likes: newImages[index].likes + 1,
      };
      return newImages;
    });
  };

  return (
    <section>
      <div className={styles.buttoncontainer}>
      <button onClick={()=>Navigate("/Mostlike")} >Most like</button>
      <button onClick={()=>Navigate("/Recent")} >Recent</button>
       
      </div>

      <label className={styles.addImages}>
        + Add Images
        <br />
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>

      <div className={styles.cardContainer}>
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image.url} className={styles.card}>
                <img src={image.url} alt="upload" />
                <div className={styles.cardInfo}>
                  <p className={styles.uploadTime}>Uploaded at {image.time}</p>
                  <div className={styles.likeContainer}>
                    <p className={styles.likeCount}>{image.likes}</p>
                    <button
                      className={styles.likeBtn}
                      onClick={(event) => handleLike(index, event)}
                    >
                      <span role="img" aria-label="like-icon">
                        👍
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
      </div>
    </section>
  );
};

export default App;
