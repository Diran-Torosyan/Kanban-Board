import React from "react";

const Dashboard_Bar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        backgroundColor: "black",
        width: "100%",
        height: "30px",
        paddingLeft: "20px",
        marginTop: "5px",
        fontSize: "18px",
        fontWeight: "bold",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      My Board
    </div>
  );
};

export default Dashboard_Bar;
