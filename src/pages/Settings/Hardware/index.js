// Assets.js
import React from "react";
import "./index.css";

export const Hardware = () => {
    // Sample data representing assets and their details
    const assetsData = [
        {
            id: 1,
            name: "Asset 1",
            location: "Location 1",
            type: "Type 1",
            software: "Software 1"
        },
        {
            id: 2,
            name: "Asset 2",
            location: "Location 2",
            type: "Type 2",
            software: "Software 2"
        },
        {
            id: 3,
            name: "Asset 3",
            location: "Location 3",
            type: "Type 3",
            software: "Software 3"
        }
    ];

    return (
        <div className="assets-container">
            <div className="headerContainer">
                    <h2>Assets</h2>
                    <div className="buttons">
                        <button>Add</button>
                        <button>Remove</button>
                        <button>Edit</button>
                    </div>
                </div>
            {assetsData.map(asset => (
                <div key={asset.id} className="asset">
                    <h2>{asset.name}</h2>
                    <div className="details">
                        <p><strong>Location:</strong> {asset.location}</p>
                        <p><strong>Type:</strong> {asset.type}</p>
                        <p><strong>Software:</strong> {asset.software}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

