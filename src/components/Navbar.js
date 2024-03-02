import React, { useState } from 'react'

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    return (
    <>
    <nav className='navbar'>
        <div className='navbar-container'>
            
            <a href ="/" className="navbar-logo">
                AIO <i class="fa-solid fa-pen"></i>
            </a>
            
            <div className='menu-icon' onClick={handleClick}>
                <i class="fa-solid fa-bars"></i>
                <i className={click ? 'fas fa-times' : 'fas fa_bars'} />
            </div>
            
            <ul className={click ? 'nav-menu active': 'nav-menu'}>
                
                <li className='nav-item'>
                    <a href ="/" className='nav-link' onClick={closeMobileMenu}>
                        Home
                    </a>    
                </li>

                <li className='nav-item'>
                    <a href ="/" className='nav-link' onClick={closeMobileMenu}>
                        Profile
                    </a>    
                </li> 

            </ul>

        </div>
    </nav>
    </>
  )
}

export default Navbar