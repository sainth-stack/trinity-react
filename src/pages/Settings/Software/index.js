// Software.js

import React, { useState } from "react";
import "./index.css";
import {MdEdit} from 'react-icons/md'
import { RxCross2 } from "react-icons/rx";

export const Software = () => {
    const [apiKey, setApiKey] = useState("sample-api-key");
    const [editMode, setEditMode] = useState(false);
    const [newApiKey, setNewApiKey] = useState("");

    const handleEditClick = () => {
        setEditMode(true);
        setNewApiKey(apiKey);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        setApiKey(newApiKey);
    };

    return (
        <div className="software-container">
            <div className="headerContainer">
                <h1 className="header">API Integration</h1>
                <div className="buttons">
                    <button>Add</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>API Key</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Metric</td>
                        <td><span className="chip active">Active</span></td>
                        <td>
                            {editMode ? (
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <input
                                    style={{width:'140px'}}
                                        type="text"
                                        value={newApiKey}
                                        onChange={(e) => setNewApiKey(e.target.value)}
                                    />
                                    <RxCross2 onClick={handleSaveClick}/>
                                </div>
                            ) : (
                                <>
                                    {apiKey}
                                    <MdEdit onClick={handleEditClick}/>
                                </>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Microsoft Dynamics</td>
                        <td><span className="chip error">Error</span></td>
                        <td>sample-api-key</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td><span className="chip inactive">Inactive</span></td>
                        <td>sample-api-key</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
