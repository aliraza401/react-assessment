import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ data, styles }) {
  return (
    <div className="displayContainer">
      <div className="PrograssBar">
        {data.map(({ progress, color }, index) => (
          <div
            key={`${index}-${progress}`}
            className="progess"
            style={{
              ...styles,
              width: `${progress}%`,
              backgroundColor: color,
              zIndex: index,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
