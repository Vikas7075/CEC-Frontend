import React from 'react';

const CreatePost = () => {
    return (
        <form style={{}}>
            <div className="create-post">
                <div className="create-post-input">
                    <img src="images/user-1.png" alt="User" />
                    <textarea rows="2" placeholder="Create a post"></textarea>
                </div>
                <div className="create-post-links">
                    <li><img src="images/photo.png" alt="Photo" />Photo</li>
                    <li><img src="images/video.png" alt="Video" />Video</li>
                    <li><img src="images/event.png" alt="Event" />Event</li>
                    <li>Post</li>
                </div>
            </div>
        </form>
    );
};

export default CreatePost;
