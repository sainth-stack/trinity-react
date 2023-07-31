/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./styles.css";
import {LuFileClock} from 'react-icons/lu'
import {HiUserGroup} from 'react-icons/hi'
import {VscFileSymlinkDirectory} from 'react-icons/vsc'
import {FaFileContract} from 'react-icons/fa'
import { Link } from "react-router-dom";
export default function Sidebar() {

  return (
    <>
      <div class="shadow sidebar-scroll sticky-top zindex99" style={{ overflow: 'auto',width:'220px' }}>
        <ul class="sidebar-list-items" id="menu">
          <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/resource-management" class="nav-link align-middle px-2 nav-item">
              <HiUserGroup size={20} />
              <span class="ms-1 d-none d-sm-inline link-text text-black px-1">Resource Management</span>
            </Link>
          </li>
          <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/timesheet" class="nav-link align-middle px-2 nav-item">
             <LuFileClock size={20}/>
              <span class="ms-1 d-none d-sm-inline link-text px-1">TimeSheet</span>
            </Link>
          </li>
          <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/projects" class="nav-link align-middle px-2 nav-item">
             <VscFileSymlinkDirectory size={20}/>
              <span class="ms-1 d-none d-sm-inline link-text px-1">Projects</span>
            </Link>
          </li>
          <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/reports" class="nav-link align-middle px-2 nav-item">
             <FaFileContract size={20}/>
              <span class="ms-1 d-none d-sm-inline link-text px-1">Reports</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
