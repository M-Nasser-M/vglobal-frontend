import React from "react";

type Props = {};

const NoContent = (props: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        color: "Red",
      }}
    >
      No Content available
    </div>
  );
};

export default NoContent;
