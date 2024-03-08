import React, { useContext } from 'react';
import { Context } from '../main';
import { Link } from 'react-router-dom';

const ConnectionCard = ({ connection, onAccept, onReject }) => {

    const { user, setIsAuthenticated, setLoading } = useContext(Context);
    const isAccepted = connection.status === 'accepted';
    const isRejected = connection.status === 'rejected';
    return (
        <>
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-[300px] sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-10 bg-white shadow-xl rounded-lg text-gray-900">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                </div>
                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    {/* Display sender's profile picture */}
                    <img className="object-cover object-center h-32" src={connection.sender.profilePicture} alt='Sender' />
                </div>
                <div className="text-center mt-2">
                    {/* Display sender's username */}
                    <Link to={`/userdashboard/${connection.sender._id}`}><h2 className="font-semibold">{connection.sender.username}</h2></Link>
                    {/* Display sender's email */}
                    <p className="text-gray-500">{connection.sender.headline}</p>
                    {/* Display status of the connection */}
                    <p className="text-gray-500">{connection.status}</p>
                </div>

                <div className="p-4 border-t mx-8 mt-2 flex gap-2">
                    {isAccepted ? (
                        <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Message</button>
                    ) : isRejected ? (
                        <button className="w-1/2 block mx-auto rounded-full bg-gray-300 hover:shadow-lg font-semibold line-through text-black px-6 py-2">Rejected</button>
                    ) : (
                        <>
                            <button onClick={onAccept} className="w-1/2 block mx-auto rounded-full hover:text-green-600 bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Accept</button>
                            <button onClick={onReject} className="w-1/2 block mx-auto rounded-full hover:text-red-600 bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Reject</button>
                        </>
                    )


                    }
                </div>
            </div>
        </>
    );
}

export default ConnectionCard;
