/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/Logo2.png'

export default function SidebarV2() {

  return (
    <>
      <div class="shadow sidebar-scroll sticky-top zindex99 bg-white" style={{ overflow: 'auto', width: '220px', height: '100vh' }}>
        <div style={{
          marginTop:'5px',
          marginBottom:'50px'
        }}>
          {/* <img
            src={Logo}
            style={{ width: '160px' }}
            id="logo_RL"
          /> */}
        </div>
        <ul class="sidebar-list-items" id="menu" style={{marginLeft:'10px'}}>
          <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/temp" class="nav-link align-middle px-2 nav-item">
              {/* <HiUserGroup size={20} /> */}
              <span class="ms-1 d-none d-sm-inline link-text text-black px-1">Temperature</span>
            </Link>
          </li>
          <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/humidity" class="nav-link align-middle px-2 nav-item">
              {/* <HiUserGroup size={20} /> */}
              <span class="ms-1 d-none d-sm-inline link-text text-black px-1">Humidity</span>
            </Link>
          </li>
          <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/harvest" class="nav-link align-middle px-2 nav-item">
              {/* <HiUserGroup size={20} /> */}
              <span class="ms-1 d-none d-sm-inline link-text text-black px-1">Harvest</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
