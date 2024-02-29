import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import LikeButton from './LikeButton';
import { Link, useParams } from 'react-router-dom';
import { Context, server } from '../main';
import Comments from './Comments';
import axios from 'axios';
import toast from 'react-hot-toast';
import { calculateTimeDifference } from '../utils/timeUtils';

const Post = ({ post }) => {
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState([]);
    const [content, setContent] = useState("");
    const [refresh, setRefresh] = useState(false);


    const addComment = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }
        try {
            await axios.post(`${server}/api/post/comment/${post._id}`, { content }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            toast.success("Comment add successfully..");
            setContent("");
            setRefresh((prev) => !prev);
        } catch (error) {
            toast.error(error.response.data.message || "Failed to add comment");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${server}/api/post/comment/${post._id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                console.log(data.comments)
                setComment(data.comments);
                setRefresh((prev) => !prev);
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [post._id, refresh]);

    return (
        <div className="post">
            <div className="post-author">
                <img className='' src={post.user.profilePicture} alt="Author" />
                <div>
                    {isAuthenticated ? (
                        <Link className=' hover:underline' to={`/userdashboard/${post.user._id}`}>
                            <h1>{post.user.username}</h1>
                        </Link>
                    ) : (
                        <h1>{post.user.username}</h1>
                    )}
                    <small>{post.user.headline}</small>
                    <small>{calculateTimeDifference(post.createdAt)}</small>
                </div>
            </div>
            <p>{post.content}</p>
            {post.image && <img src={post.image} width="100%" alt="Post" />}
            <div className="post-stats">
                <div>
                    <img src="images/thumbsup.png" alt="Thumbs Up" />
                    <span className="liked-users">{post.likes.length} Likes</span>
                </div>
                <div>
                    <span>{post.comments.length} Comments</span>
                </div>
            </div>
            <div className="post-activity">
                <div className="post-activity-link">
                    <img src="images/like.png" alt="Like" />
                    <LikeButton postId={post._id} />
                </div>
                <div className="post-activity-link">
                    <img src="images/comment.png" alt="Comment" />
                    <button onClick={() => setShowModal(!showModal)}><span>Comment</span></button>
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
            {showModal && (
                <>
                    {/* <!-- Comment Form --> */}
                    {
                        isAuthenticated && (<form onSubmit={addComment} className="">
                            <div className="mb-2 px-2">
                                <input
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    id="comment" name="comment" placeholder='Add a comment...' className="border-2 border-gray-400 px-3 py-2 w-full rounded-lg" required />
                            </div>

                            <button type="submit"
                                className="bg-purple-700 text-white font-medium py-1 px-3 ml-2 rounded-lg hover:bg-purple-600">Post
                            </button>
                        </form>)
                    }

                    {comment && comment.map((comment) => (
                        <Comments key={comment._id} comment={comment} />
                    ))}
                </>
            )}
        </div>
    );
};

export default Post;
