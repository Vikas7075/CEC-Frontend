import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Menu = () => {

    const { user, isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
    const logoutHandler = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/users/logout`, {}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true

            });
            setIsAuthenticated(false);
            toast.success(data.message);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false)
        }
    }


    return (
        <div className="bg-black w-[200px] flex flex-col items-center absolute top-12 right-2 md:right-5 rounded-md p-4 space-y-1">

            {isAuthenticated ? (
                <>
                    <Link to={`/userdashboard/${user._id}`} className="text-white hover:underline text-sm hover:text-gray-500 cursor-pointer">View Profile</Link>

                </>

            ) :
                (< Link to="/register" className="text-white text-sm hover:text-gray-500 cursor-pointer">Register</Link>)
            }

            {!isAuthenticated ? (<Link to="/login" className="text-white text-sm hover:text-gray-500 cursor-pointer">Login</Link>) :
                (<Link onClick={logoutHandler} className="text-white text-sm hover:text-gray-500 cursor-pointer">Log Out</Link>)

            }
        </div >
    );
};

export default Menu;
