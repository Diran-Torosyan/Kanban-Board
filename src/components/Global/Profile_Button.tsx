import React from "react";

const Profile_Button: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
            }}
        >
        <button
            style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#D9D9D9",
                border: "5px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "12.9px",
                right: "30px",
            }}
        >
        <img
            src= "src\assets\images\image 3.png"
            alt= "Profile"
            style={{
                width: "125%",
                height: "125%",
                objectFit: "contain",
            }}
        />
        </button>
        </div>
    )
}

export default Profile_Button;
