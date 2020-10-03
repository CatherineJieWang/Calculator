import React from "react";
import "./Result.scss";

export default function Result(props){
 return (
      <div className="display">
        <span className="displaySpan">
          {props.display}
        </span>
      </div>
    );
}