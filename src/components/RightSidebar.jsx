import React from 'react';

// SidebarNews component
const SidebarNews = () => {
    return (
        <div className="sidebar-news">
            <img src="./images/more.png" className="info-icon" alt="Info" />
            <h3>Trending News</h3>
            <a href="#">High demand for skilled manpower</a>
            <span>5h ago &middot; 10,934 readers</span>

            <a href="#">Carrers growing horizontly too </a>
            <span>7d ago &middot; 1i,934 readers</span>

            <a href="#">Less work visa for US </a>
            <span>1h ago &middot; 1,934 readers</span>

            <a href="#">More Hiring </a>
            <span>3d ago &middot; 2,934 readers</span>

            <a href="#">Gautam Adani is the world's third richest</a>
            <span>12h ago &middot; 13,934 readers</span>

            <a href="#" className="read-more-link">Read More</a>
        </div>
    );
};

// SidebarAd component
const SidebarAd = () => {
    return (
        <div className="sidebar-ad">
            <small>Ad &middot; &middot; &middot;</small>
            <p>Top 5 principle of full stack development</p>
            <div>
                <img src="./images/user-1.png" alt="User" />
                <img src="./images/mi-logo.png" alt="Logo" />
            </div>
            <b>Brand and Demand in Xiaomi</b>
            <a href="#" className="ad-link">Learn More</a>
        </div>
    );
};

// RightSidebar component
const RightSidebar = () => {
    return (
        <div className="right-sidebar">
            <div className="sidebar-container">
                <SidebarNews />
                <SidebarAd />
            </div>
        </div>
    );
};

export default RightSidebar;
