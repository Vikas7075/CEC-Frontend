import React, { useState } from 'react';
import Menu from './Menu'

function Navbar() {

    const [menu, setMenu] = useState(false);

    const showMenu = () => {
        setMenu(!menu);
    }
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className=" w-16">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/CEC_Logo.jpg" alt="logo.png" />
                </a>
                <div className="search-box">
                    <img src="images/search.png" alt="search" />
                    <input
                        type="text"
                        name="search"
                        id="nav-search"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className="navbar-center">
                <ul>
                    <li>
                        <a href="/" className="active-link">
                            <img src="/images/home.png" alt="home" />
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/network.png" alt="network" />
                            <span>My Network</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/jobs.png" alt="jobs" />
                            <span>Jobs</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/message.png" alt="message" />
                            <span>Message</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/notification.png" alt="notification" />
                            <span>Notification</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="navbar-right" onClick={showMenu}>
                <div className="online">

                    <img
                        src='https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg'
                        alt="user"
                        className="nav-profile-img"
                    />

                </div>
                {menu && <Menu />}
            </div>
        </nav>
    );
}

export default Navbar;
