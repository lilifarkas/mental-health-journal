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

        <div>
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
                  {user != null &&                  <li className="nav-item px-4">
                  <button className='logout' onClick={handleLogout}>
                                <BiLogOut />
                            </button>
                  </li> }

                  </ul>
              </div>
          </nav>
      </div>

        // <div className='navbar'>
        //     <header>
        //         <h3>Logo</h3>
        //         <nav ref={navRef}>
        //             <a href="/#">Home</a>
        //             <a href="/#">Journal</a>
        //             <a href="/profile">Profile</a>
        //             <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        //                 <FaTimes />
        //             </button>
        //         </nav>
        //         <button className="nav-btn" onClick={showNavbar}>
        //             <FaBars />
        //         </button>
        //     </header>
        // </div>
    );
}

export default NavBar;