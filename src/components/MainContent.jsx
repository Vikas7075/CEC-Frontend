import React, { useContext, useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import Post from './Post';
import { Context, server } from '../main';
import axios from 'axios';

const MainContent = () => {

    const { setIsAuthenticated, setLoading } = useContext(Context);
    const [data, setData] = useState([]);
    const [newPost, setNewPost] = useState(null);
    const [postUser, setPostUser] = useState(null);
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
                setData(response.data.posts);
                console.log(response.data)

            } catch (error) {
                console.error('Error getting post:', error);
                // Handle error if submission fails
            }
        };
        fetchData();
    }, [])


    // console.log(newPost);
    // console.log(postUser);

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
