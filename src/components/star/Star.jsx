import React from "react";

export default function ({ slected, total, size }) {
  return [...Array(total)].map((item, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size ? size : 24}
      height={size ? size : 24}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
        fill={index + 1 <= slected ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"}
      />
    </svg>
  ));
}
