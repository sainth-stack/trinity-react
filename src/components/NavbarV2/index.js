/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import "./styles.scss";
// import userprofile from '../../assets/images/userprofile.png'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import avatar from '../../assets/svg/avatar.svg'

function NavbarV2() {
  const navigate = useNavigate()
  const [name, setName] = useState("Dashboard")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/login')
  }

  let location = useLocation();
  useEffect(() => {
    if (location.pathname == '/rooms') {
      setName("Rooms")
    } else if (location.pathname == '/humidity') {
      setName("Humidity")
    } else if (location.pathname == '/harvest') {
      setName("Harvest")
    }
    else if (location.pathname == '/new-harvest') {
      setName("Harvest")
    } else if (location.pathname == '/strains') {
      setName("Strains")
    } else if (location.pathname == '/dashboard') {
      setName("Dashboard")
    }
  }, [location.pathname])
  return (
    <>
      <nav class="navbar navbar-expand-lg  navbar-light bg-white shadow-sm sticky-top" style={{
        position: 'fixed',
        top: 0,
        left: 220,
        right: 0
      }}>
        <div class="collapse navbar-collapse" style={{ marginLeft: '0px' }} id="navbarNav">
          {/* <img
            src={Logo}
            style={{ width: '160px' }}
            id="logo_RL"
          /> */}
          <div style={{
            marginLeft: '10px',
            marginTop: '0px',
            padding: '12px',
            fontWeight: 700,
            fontSize: '23px'
          }}>
            {name}
          </div>
        </div>
        <div class="nav-item dropdown d-flex align-items-center mr-2 pr-5" style={{ color: 'black' }}>
          <img
            src={avatar}
            style={{ width: "32px", marginRight: '5px' }}
            id="logo_RL"
          />
          <a
            className="nav-link dropdown-toggle p-0 m-0 pe-5"
            href="/#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <span className="fs14 text-dark" title={"Admin"}>
              {localStorage.getItem("userName") || 'admin'}
            </span>
            <i class="bi bi-caret-down-fill"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown" style={{ position: "absolute", left: "-30px", top: "35px" }}>
            <span class="dropdown-item cursor-pointer" style={{cursor:'pointer'}} onClick={()=>navigate('/accounts')}>Settings</span>
            <span class="dropdown-item cursor-pointer" style={{cursor:'pointer'}} onClick={() => handleLogout()}>Logout</span>
          </div>
        </div>
      </nav>
    </>

  );

}
export default NavbarV2;
