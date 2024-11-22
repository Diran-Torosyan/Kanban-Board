import React from "react";

const Notification_Button: React.FC = () => {
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
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "12.9px",
                right: "120px",
            }}
        >
        
        </button>
        </div>
    )
}

export default Notification_Button;