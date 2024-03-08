import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context, server } from '../main';
import { Link } from 'react-router-dom';

// SidebarNews component
const SidebarNews = () => {
    const [users, setUsers] = useState([]);
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${server}/api/users/all/users`, {
                    withCredentials: true
                });
                setUsers(response.data.reverse());
            } catch (error) {
                console.log(error)
            }
        };
        getAllUsers();
    }, []);

    const sliceHeadline = (headline, maxLength) => {
        if (headline.length > maxLength) {
            return headline.slice(0, maxLength) + '....';
        }
        return headline;
    }
    const recentUsers = users.slice(0, 8);
    return (
        <div className="sidebar-news">
            <img src="./images/more.png" className="info-icon" alt="Info" />
            <h3>Recent Users</h3>
            <div>
                {recentUsers.map(user => (
                    <Link to={`/userdashboard/${user._id}`}>
                        <div key={user._id} className="p-1 flex items-center justify-between border-t cursor-pointer">
                            <div className="flex items-center">
                                <img className="rounded-full h-10 w-10" src={user.profilePicture} alt={user.username} />
                                <div className="ml-2 flex flex-col">
                                    <div className="leading-snug text-sm text-gray-900 font-bold">@{sliceHeadline(user.username, 10)}</div>
                                    <div className="leading-snug text-xs text-gray-600">{sliceHeadline(user.headline, 15)}</div>
                                </div>
                            </div>
                            <button className="h-5 px-1 text-sm font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
                                Profile
                            </button>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
};

// SidebarAd component
const SidebarAd = () => {
    return (
        <div className="sidebar-ad">
            {/* <small>Ad &middot; &middot; &middot;</small>
            <p>Top 5 principle of full stack development</p>
            <div>
                <img src="./images/user-1.png" alt="User" />
                <img src="./images/mi-logo.png" alt="Logo" />
            </div>
            <b>Brand and Demand in Xiaomi</b>
            <a href="#" className="ad-link">Learn More</a> */}
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
