import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './index.css'
export const Accounts = () => {
    const [userData, setUserData] = useState({
        username: "testuserus",
        password: "TestUser",
        firstName: "Test",
        lastName: "User",
        address: "California, USA",
        phoneNumber: "+91 94738838383",
        pushNotifications: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(userData);
    };

    return (
        <div className="container">
            <h2>Welcome, TestUser</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} />
                    {/* <button type="button">Edit</button> */}
                </div>
                <div className="" style={{display:'flex',width:'100%',justifyContent:'space-between',gap:'20px'}}>
                    <div className="form-group" style={{width:'100%'}}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{width:'100%'}}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea type="text" id="address" name="address" value={userData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ display: 'flex' }}>
                    <input type="checkbox" id="pushNotifications" name="pushNotifications" checked={userData.pushNotifications} onChange={handleChange} />
                    <label htmlFor="pushNotifications">Allow Push Notifications</label>
                </div>
                <button type="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

