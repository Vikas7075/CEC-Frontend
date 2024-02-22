import React from 'react';


const Post = () => {
    return (
        <div className="post">
            <div className="post-author">
                <img className='' src="images/user-2.png" alt="Author" />
                <div>
                    <h1>Bejamin Leo</h1>
                    <small>Founder and CEO at Gallelio Group | Angel Investor</small>
                    <small>2 hours ago</small>
                </div>
            </div>
            <p>
                The success of every website depends on search engine optimization
                and digital marketing strategy.
            </p>
            <img src="images/post-image-2.png" width="100%" alt="Post" />
            <div className="post-stats">
                <div>
                    <img src="images/thumbsup.png" alt="Thumbs Up" />
                    <img src="images/love.png" alt="Love" />
                    <img src="images/clap.png" alt="Clap" />
                    <span className="liked-users">Abhinav Mishra and 75 others</span>
                </div>
                <div>
                    <span>22 comments &middot; 30 shares</span>
                </div>
            </div>
            <div className="post-activity">
                <div>
                    <img src="images/user-1.png" className="post-activity-user-icon" alt="User" />
                    <img
                        src="images/down-arrow.png"
                        className="post-activity-arrow-icon"
                        alt="Arrow"
                    />
                </div>
                <div className="post-activity-link">
                    <img src="images/like.png" alt="Like" />
                    <span>Like</span>
                </div>
                <div className="post-activity-link">
                    <img src="images/comment.png" alt="Comment" />
                    <span>Comment</span>
                </div>
                <div className="post-activity-link">
                    <img src="images/share.png" alt="Share" />
                    <span>Share</span>
                </div>
                <div className="post-activity-link">
                    <img src="images/send.png" alt="Send" />
                    <span>Send</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
