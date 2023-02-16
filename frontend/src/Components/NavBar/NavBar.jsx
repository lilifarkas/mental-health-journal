import React,{useRef} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import './NavBar.css';

function NavBar() {
    const navRef = useRef();
    
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }
    return (
        <div className='navbar'>
            <header>
                <h3>Logo</h3>
                <nav ref={navRef}>
                    <a href="/#">Home</a>
                    <a href="/#">Journal</a>
                    <a href="/profile">Profile</a>
                    <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
        </div>
    );
}

export default NavBar;