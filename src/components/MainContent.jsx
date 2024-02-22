import React from 'react';
import CreatePost from './CreatePost';
import Post from './Post';

const MainContent = () => {
    return (
        <div className="main-content">
            <CreatePost />
            <Post />
            <Post />
            <Post />
        </div>
    );
};

export default MainContent;
