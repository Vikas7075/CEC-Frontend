import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import Post from './Post';
import { server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';

const MainContent = () => {

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send form data to backend API
                const response = await axios.get(`${server}/api/post`, {}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });
                setData(response.data.posts.reverse());
                setRefresh((prev) => !prev);

            } catch (error) {
                console.error('Error getting post:', error);
                toast.error(error);
            }
        };
        fetchData();
    }, [refresh]);

    if (!data) {
        return <Loader />
    }

    return (
        <div className="main-content">
            <CreatePost />

            {data.map(post => (
                <Post key={post._id} post={post} />
            ))}

        </div>
    );
};

export default MainContent;
