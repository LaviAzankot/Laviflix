import React from "react";


export default function MultiSlide(props) {
  return (
    <li
      className="multi-slide"
    >
        <a>
            <img src={props.url} alt={props.alt} />
        </a>
    </li>
  );
}
