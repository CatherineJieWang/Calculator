import React from "react";
import "./History.scss";

export default function History() {
  const Historydata =
    localStorage.getItem("Calculate") &&
    localStorage.getItem("Calculate").split(",").reverse();

  function closeHistory(){
    const curhistory = document.getElementById("history");
    curhistory.style.display='none'
  }
  return (
    <div id='history' className="historycontainer">
      <div className="historyheader">History</div>
      <div className="historyclosebtn" onClick={()=>closeHistory()}>×</div>
      {Historydata && Historydata.map((data, index) => (
        <div key={index} className="historyline">
         <div className="historycalculation">{data.split('=')[0]+' = '}</div>
         <div className="historyresult">{data.split('=')[1]}</div> 
        </div>
      ))}
    </div>
  );
}
