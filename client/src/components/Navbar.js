import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    return (
    <>
    <nav className='navbar'>
        <div className='navbar-container'>
            
            <Link to="/" className="navbar-logo">
                Vocable <i class="fa-solid fa-pen"></i>
            </Link>
            
            <div className='menu-icon' onClick={handleClick}>
                <i class="fa-solid fa-bars"></i>
                <i className={click ? 'fas fa-times' : 'fas fa_bars'} />
            </div>
            
            <ul className={click ? 'nav-menu active': 'nav-menu'}>
                
                <li className='nav-item'>
                    <Link to="/" className='nav-link' onClick={closeMobileMenu}>
                        Home
                    </Link>    
                </li>

                <li className='nav-item'>
                    <Link to="/" className='nav-link' onClick={closeMobileMenu}>
                        Profile
                    </Link>   
                </li> 

            </ul>

        </div>
    </nav>
    </>
  )
}

export default Navbar