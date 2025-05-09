import React from "react";

interface Props {
    title: string;
}

const Dashboard_Bar: React.FC<Props> = ({title}) => {
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
      {title}
    </div>
  );
};

export default Dashboard_Bar;
