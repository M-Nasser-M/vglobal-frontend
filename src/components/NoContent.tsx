import React from "react";

const NoContent = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        color: "Red",
      }}
    >
      <span>No Content available</span>
    </div>
  );
};

export default NoContent;
