import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import Join from "./Join";
import MultiCarousel from "./MultiCarousel";

export default function HomePage() {
  return (
    <div className="HomePage">
        <Header/>
        <Carousel/>
        <Join/>
        <MultiCarousel />
    </div>
  );
}


