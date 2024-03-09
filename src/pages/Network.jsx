import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Loader from '../components/Loader.jsx';
import ProfileCard from '../components/profileCard.jsx';
import { Context, server } from '../main.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import ConnectionCard from '../components/connectionCard.jsx';

function Network() {
    const [users, setUsers] = useState([]);
    const [connections, setConnections] = useState([]);
    const [requestId, setRequestId] = useState("");
    const [refresh, setRefresh] = useState(false);
    const { user, setIsAuthenticated, setLoading, loading } = useContext(Context);
    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [setIsAuthenticated, setLoading])

    useEffect(() => {
        if (user._id) {
            getConnections();
        }
    }, [user, refresh]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${server}/api/users/all/users`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(response.data);
            // Filter out users who are already connected or have pending connection requests
            const filteredUsers = response.data.filter(user => {
                // Check if the user is already connected
                const isConnected = connections.some(conn => conn.receiver._id === user._id || conn.sender._id === user._id);

                // Check if there is a pending connection request
                const hasPendingRequest = connections.some(conn =>
                    conn.status === 'pending' && (conn.receiver._id === user._id || conn.sender._id === user._id)
                );

                // Check if the current user has sent a connection request to this user
                const sentRequest = connections.some(conn =>
                    conn.status === 'pending' && conn.sender._id === user._id && conn.receiver._id === currentUser._id
                );

                return !isConnected && !hasPendingRequest && !sentRequest;
            });
            setUsers(filteredUsers);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Error occurred while fetching data");
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const getConnections = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${server}/api/connections/${user._id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(response.data);
            setConnections(response.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Error occurred while fetching data");
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const acceptConnectionRequest = async (requestId) => {
        try {
            await axios.put(`${server}/api/connect/${requestId}/accept`, null, {
                withCredentials: true
            });
            toast.success('Request Accepted..')
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while accepting connection request");
        }
    };

    const rejectConnectionRequest = async (requestId) => {
        try {
            await axios.put(`${server}/api/connect/${requestId}/reject`, null, {
                withCredentials: true
            });
            toast.success('Request rejected..');
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while rejecting connection request");
        }
    };

    const sendConnectionRequest = async (userId) => {
        try {
            const response = await axios.post(`${server}/api/connect/${userId}`, null, {
                withCredentials: true
            });
            setRequestId(response.data.newRequest._id);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div>
                <h1 className='justify-start mt-10 text-2xl font-extrabold ml-10'>Your Network</h1>
                <div className='flex flex-wrap px-10'>
                    {connections.length > 0 ? (
                        connections.map(conn => (
                            <ConnectionCard
                                key={conn._id} connection={conn}
                                onAccept={() => { acceptConnectionRequest(conn._id) }}
                                onReject={() => { rejectConnectionRequest(conn._id) }}
                            />
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
            <div>
                <h1 className='justify-start mt-10 font-extrabold ml-10'>People you may know based on your recent activity</h1>
                <div className='flex flex-wrap px-10'>
                    {users.length > 0 ? (
                        users.map(currentUser => (
                            <ProfileCard
                                key={currentUser._id}
                                user={currentUser}
                                sendConnectionRequest={sendConnectionRequest}
                            />
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </>
    )
}

export default Network;
