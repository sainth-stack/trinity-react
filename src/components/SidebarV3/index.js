import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SidebarV2() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");

  // Update selected item when location changes
  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);
  return (
    <div
      className="shadow sidebar-scroll sticky-top zindex99 bg-white"
      style={{ overflow: "auto", width: "220px", height: "100vh" }}
    >
      <div
        style={{
          marginTop: "5px",
          marginBottom: "50px",
        }}
      >
        {/* <img
          src={Logo}
          style={{ width: '160px' }}
          id="logo_RL"
        /> */}
      </div>
      <ul
        className="sidebar-list-items"
        id="menu"
        style={{ marginLeft: "10px" }}
      >
        <SidebarItem
          to="/accounts"
          label="Accounts"
          selected={selectedItem === "/accounts"}
        />
        <SidebarItem
          to="/layout"
          label="Layout"
          selected={selectedItem === "/layout"}
        />
        <SidebarItem
          to="/hardware"
          label="Hardware"
          selected={selectedItem === "/hardware"}
        />
        <SidebarItem
          to="/software"
          label="Software"
          selected={selectedItem === "/software"}
        />
        <SidebarItem
          to="/updates"
          label="About Us"
          selected={selectedItem === "/updates"}
        />
        {/* <SidebarItem to="/data-source" label="Data Source" selected={selectedItem === "/data-source"} /> */}
      </ul>
    </div>
  );
}

// SidebarItem component for individual sidebar items
function SidebarItem({ to, label, selected }) {
  const navigate = useNavigate();
  return (
    <li
      className={`sidebar-list-item py-2 cursor-pointer ${
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
