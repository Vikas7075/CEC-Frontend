import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState(() => {
        // Retrieve liked state from local storage, default to false if not found
        return localStorage.getItem(`liked_${postId}`) === 'true';
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const navigate = useNavigate();
    const handleLike = async () => {
        setLoading(true);
        setError(null);

        try {

            const { data } = await axios.post(`${server}/api/likes/${postId}/toggle`, {}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true

            });
            if (data.success) {
                // If the operation was successful, update the liked state based on the message
                setLiked(data.message.includes("liked"));
                // Store liked state in local storage
                localStorage.setItem(`liked_${postId}`, data.message.includes("liked"));
                if (data.message.includes("liked")) {
                    toast.success("Post liked successfully");
                } else if (data.message.includes("removed")) {
                    toast.success("Post like removed successfully");
                }
            } else {
                // Handle unsuccessful response
                toast.error("Failed to toggle like");
            }

        } catch (error) {
            console.error('Error toggling like:', error);
            toast.error("Failed to toggle like, UnAuthorized User!");
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {!isAuthenticated && navigate('/login')}
            <button className=' ml-1 font-semibold' onClick={handleLike} disabled={loading} style={{ color: liked ? 'blue' : 'inherit' }}>
                {loading ? 'Loading...' : liked ? 'Liked' : 'Like'}
            </button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default LikeButton;
