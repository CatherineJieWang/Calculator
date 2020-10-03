import React from "react";
import "./Button.scss";
export default function Button(props) {
  const { className, value, onClick } = props;
  return (
    <button className={className} onClick={()=>onClick&&onClick(value)}>
      {value}
    </button>
  );
}
