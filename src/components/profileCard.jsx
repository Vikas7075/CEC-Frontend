import React, { useContext } from 'react';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ProfileCard = ({ user, sendConnectionRequest }) => {
    const { setIsAuthenticated, setLoading } = useContext(Context);

    const handleClick = async () => {
        setLoading(true);
        try {
            await sendConnectionRequest(user._id);
            toast.success('Connection request sent successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while sending connection request");
        }
        finally {
            setLoading(false);
        }
    }

    return (

        <>
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-[300px] sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-10 bg-white shadow-xl rounded-lg text-gray-900">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                </div>
                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img className="object-cover object-center h-32" src={user.profilePicture} alt='Woman looking front' />
                </div>
                <div className="text-center mt-2">
                    <Link className=' hover:underline' to={`/userdashboard/${user._id}`}><h2 className="font-semibold">{user.username}</h2></Link>
                    <p className="text-gray-500">{user.headline}</p>
                    <p className="text-gray-500">{user.connections.length} connections</p>
                </div>

                <div className="p-4 border-t mx-8 mt-2">
                    <button onClick={handleClick} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Connect</button>
                </div>
            </div>
        </>
    );
}

export default ProfileCard;
