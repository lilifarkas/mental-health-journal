import React, { useRef } from 'react';
import { NavLink } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi';
import {FaBars, FaTimes} from 'react-icons/fa';
import './NavBar.css';

function NavBar({handleLogout, user}) {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }
    return (

        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav mx-auto">
                  <li className="nav-item px-4">
                      <NavLink className="nav-link" to={'/main'}>Home</NavLink>
                  </li>
                  <li className="nav-item px-4">
                      <NavLink className="nav-link" to={'/tasks'}>Tasks</NavLink>
                  </li>
                  <li className="nav-item px-4">
                  <NavLink className="nav-link" to={'/profile'}>Profile</NavLink>
                  </li>
                      <li className="nav-item px-4">
                          <NavLink className="nav-link" to={'/admin'}>Admin</NavLink>
                      </li>
                  {user != null &&                  <li className="nav-item px-4">
                  <button className='logout' onClick={handleLogout}>
                                <BiLogOut />
                            </button>
                  </li> }

                  </ul>
              </div>
          </nav>
      </header>
    );
}

export default NavBar;