import React, { useState, useEffect } from "react";
import Slide from "./Slide";

const slidesData = [
  {
    url: "https://api.photon.aremedia.net.au/wp-content/uploads/sites/3/2023/11/Article-Image-54.png?fit=1920%2C1080",
    alt: "Friends",
  },
  {
    url: "https://m.media-amazon.com/images/M/MV5BMjAwNTRmODktZDk5Ny00ZjMwLWFhMDUtOTdlOWNhNDMyZmNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    alt: "Homeland",
  },
];

export default function Carousel() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function createSlides(){
    setSlides(
      slidesData.map((slide, index) => {
          return {
            visibility: index === currentIndex ? "visible" : "hidden",
            url: slide.url,
            alt: slide.alt
          }
    }));
  }

  // When the screen gets first loaded create the slides
  useEffect(() => {
    createSlides();
  }, []);

  console.log(slides);

  function changeSlide(event) {
    // Change the slide index to the new slide index
    const to = event.target.name;
    const movingSize = to === "next" ? 1 : -1;
    const predictedIndex = currentIndex + movingSize;

    // Check for any edge cases
    if (predictedIndex > slides.length - 1) {
      setCurrentIndex(0);
    } else if (predictedIndex < 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(predictedIndex);
    }


    // Show current slide
    setSlides((prevSlides) => {
      return prevSlides.map((slide, index) => (
      {
        ...slide,
        visibility: index === currentIndex ? "visible" : "hidden",
      }));
    });

  }

  return (
    <div className="carousel">
      <a
        name="prev"
        onClick={changeSlide}
        className="carousel-button prev"
      >
        &#8249;
      </a>

      <ul className="slides">{
        slides.map((slide, index) => {
          return (
            <Slide
              key={index}
              visibility={index === currentIndex ? "visible" : "hidden"}
              url={slide.url}
              alt={slide.alt}
            />
          );
        })}
      </ul>

      <a
        name="next"
        onClick={changeSlide}
        className="carousel-button next"
      >
        &#8250;
      </a>
    </div>
  );
}
