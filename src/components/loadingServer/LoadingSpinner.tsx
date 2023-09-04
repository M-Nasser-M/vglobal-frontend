import React from "react";
import "./loading.css";

type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
