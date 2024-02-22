import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

    return (
        <div className="bg-black w-[200px] flex flex-col items-center absolute top-12 right-2 md:right-5 rounded-md p-4 space-y-1">
            <Link to="/userdashboard" className="text-white text-sm hover:text-gray-500 cursor-pointer">User Profile</Link>
            <Link to="/login" className="text-white text-sm hover:text-gray-500 cursor-pointer">Login</Link>
            <Link to="/logout" className="text-white text-sm hover:text-gray-500 cursor-pointer">Log Out</Link>
            <Link to="/register" className="text-white text-sm hover:text-gray-500 cursor-pointer">Register</Link>
        </div>
    );
};

export default Menu;
