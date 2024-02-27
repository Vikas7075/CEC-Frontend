import React from 'react';
import moment from 'moment';
import LikeButton from './LikeButton';
import { Link, useParams } from 'react-router-dom';

const Post = ({ post }) => {

    const calculateTimeDifference = (createdAt) => {
        const currentTime = moment();
        const postTime = moment(createdAt);
        const diffInHours = currentTime.diff(postTime, 'hours');

        if (diffInHours < 1) {
            return 'Less than an hour ago';
        } else if (diffInHours === 1) {
            return '1 hour ago';
        } else {
            return `${diffInHours} hours ago`;
        }
    };



    console.log(post)
    return (
        <div className="post">
            <div className="post-author">
                <img className='' src="images/user-2.png" alt="Author" />
                <div>
                    <Link className=' hover:underline' to={`/userdashboard/${post.user._id}`}><h1>{post.user.username}</h1></Link>

                    <small>{post.user.headline}</small>
                    <small>{calculateTimeDifference(post.createdAt)}</small>
                </div>
            </div>
            <p>
                {post.content}
            </p>
            {post.image && <img src={post.image} width="100%" alt="Post" />}
            <div className="post-stats">
                <div>
                    <img src="images/thumbsup.png" alt="Thumbs Up" />
                    {/* <img src="images/love.png" alt="Love" />
                    <img src="images/clap.png" alt="Clap" /> */}
                    <span className="liked-users">{post.likes.length} Likes</span>
                </div>
                <div>
                    {/* <span>22 comments &middot; 30 shares</span> */}
                </div>
            </div>
            <div className="post-activity">
                {/* <div>
                    <img src="images/user-1.png" className="post-activity-user-icon" alt="User" />
                    <img
                        src="images/down-arrow.png"
                        className="post-activity-arrow-icon"
                        alt="Arrow"
                    />
                </div> */}
                <div className="post-activity-link">
                    <img src="images/like.png" alt="Like" />
                    <LikeButton postId={post._id} />
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
