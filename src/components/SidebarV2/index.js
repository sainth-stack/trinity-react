import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import the hamburger and close icons from react-icons
import "./styles.css";

export default function SidebarV2() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="zindex99">
      {/* Menu button for small screens */}
      <div className="menu-icon-container d-block d-lg-none">
        <button className="btn btn-light" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <FaTimes style={{ fontSize: "1.5rem" }} />
          ) : (
            <FaBars style={{ fontSize: "1.5rem" }} />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar shadow sidebar-scroll sticky-top bg-white ${
          isSidebarOpen ? "open" : ""
        }`}
        style={{ height: "100vh" }}
      >
        <div style={{ marginTop: "5px", marginBottom: "50px" }}>
          {/* <img src={Logo} style={{ width: '160px' }} id="logo_RL" /> */}
        </div>
        <ul
          className="sidebar-list-items"
          id="menu"
          style={{ marginLeft: "10px" }}
        >
          <SidebarItem
            to="/data-source"
            label="Data Source"
            selected={selectedItem === "/data-source"}
          />
          <SidebarItem
            to="/dashboard"
            label="Stains"
            selected={selectedItem === "/dashboard"}
          />
          <SidebarItem
            to="/rooms"
            label="Rooms"
            selected={selectedItem === "/rooms"}
          />
          <SidebarItem
            to="/harvest"
            label="Harvest"
            selected={selectedItem === "/harvest"}
          />
          <SidebarItem
            to="/strains"
            label="Photosynthesis"
            selected={selectedItem === "/strains"}
          />
          <SidebarItem
            to="/cure-rooms"
            label="Cure Rooms"
            selected={selectedItem === "/cure-rooms"}
          />
        </ul>
      </div>
    </div>
  );
}

function SidebarItem({ to, label, selected }) {
  const navigate = useNavigate();
  return (
    <li
      className={`sidebar-list-item  item py-2 cursor-pointer ${
        selected ? "selected" : ""
      }`}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(to)}
    >
      <Link
        to={to}
        className={`nav-link align-middle px-2 nav-item`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className="ms-1 d-none d-sm-inline px-1"
          style={{ color: selected ? "white" : "black" }}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
