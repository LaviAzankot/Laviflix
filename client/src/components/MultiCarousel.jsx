import React, { useState, useEffect } from "react";
import MultiSlide from "./MultiSlide";

const slidesData = [
    {
      url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/4301/1134301-v-e786e8153654",
      alt: "Grey's Anatomy",
    },
    {
      url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/3848/1133848-v-d3d2ccc2c039",
      alt: "The Walking Dead",
    },
    {
        url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/1179/1311179-v-d77998aeda9b",
        alt: "Bluey",
    },
    {
        url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/3560/1193560-v-6434a32de17f",
        alt: "How I Met Your Mother",
    },
    {
        url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/41/1731714570041-v",
        alt: "Modern Family",
    },
    {
        url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/1442/1451442-v-4d17b2b97189",
        alt: "Betty",
    },
    {
        url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/2216/1182216-v-3a71cd735683",
        alt: "Quantico",
    },
    {
        url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/150/1724735470150-v",
        alt: "Only Murders in the Building",
    },
    {
        url: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/sources/r1/cms/prod/9734/1718416939734-v",
        alt: "The Simpsons",
    },
];

export default function MultiCarousel(){
  const [slides, setSlides] = useState([]);
  const [currentIndexs, setCurrentIndexs] = useState([0, 1, 2, 3, 4, 5]);

  function createSlides(){
    setSlides(
        currentIndexs.map((i) => {
        const newSlide = slidesData[i]
        return {
          id: i,
          url: newSlide.url,
          alt: newSlide.alt,
        }
    }))
  }

  // When the screen gets first loaded create the slides
  useEffect(() => {
    createSlides();
  }, []);

  function changeSlide(event) {
    createSlides();
    // Change the slide index to the new slide index
    const to = event.target.name;
    const movingSize = to === "next" ? 1 : -1;
    const predictedIndex =  movingSize === 1 ? currentIndexs[currentIndexs.length - 1] + 1: currentIndexs[0] - 1; 
    const expression = movingSize === 1 ?  predictedIndex >= slidesData.length : predictedIndex < 0;

    // Check for any edge cases
    if (expression) {
      return;
    } 

    // Set the indexs
    setCurrentIndexs((prevIndexs) => {
        return prevIndexs.map((prevIndex) => {
            return prevIndex + movingSize;
        });
    });
    
  }

  return (
    <div className="multi-carousel">
      <p id="desc">Our best series</p>
      <ul className="multi-slides">

        <a
          name="prev"
          onClick={changeSlide}
          className="multi-carousel-button prev"
        >
          &#8249;
        </a>

        {
          slides.map((slide, index) => {
            return (
              <MultiSlide
                key={index}
                url={slide.url}
                alt={slide.alt}
              />
            );
          })
        }

        <a
          name="next"
          onClick={changeSlide}
          className="multi-carousel-button next"
        >
          &#8250;
        </a>

      </ul>
        

  </div>
  );
}