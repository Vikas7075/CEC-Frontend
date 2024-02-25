import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    console.log(postId)

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
            console.log(data)
            setLiked(data);
            // Check the message from the backend response
            if (data.message.includes("liked")) {
                toast.success("Post liked successfully");
            } else if (data.message.includes("removed")) {
                toast.success("Post like removed successfully");
            }

        } catch (error) {
            console.error('Error toggling like:', error);
            toast.error("Failed to toggle like");
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <button onClick={handleLike} disabled={loading} style={{ color: liked ? 'blue' : 'inherit' }}>
                {loading ? 'Loading...' : liked ? 'Liked' : 'Like'}
            </button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default LikeButton;
