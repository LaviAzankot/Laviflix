import React from "react";

export default function Slide(props) {
  return (
    <li
      className="slide"
      style={{
        visibility: props.visibility
      }}
    >
      <img src={props.url} alt={props.alt} />
    </li>
  );
}
