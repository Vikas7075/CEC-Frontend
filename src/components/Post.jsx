import React, { useContext, useEffect, useState } from 'react';
import LikeButton from './LikeButton';
import { Link, useParams } from 'react-router-dom';
import { Context, server } from '../main';
import Comments from './Comments';
import axios from 'axios';
import toast from 'react-hot-toast';
import { calculateTimeDifference } from '../utils/timeUtils';
import Loader from './Loader';
import formatContent from '../utils/formatPostContent';

const Post = ({ post }) => {
    const { user, isAuthenticated, setIsAuthenticated } = useContext(Context);
    const { loading, setLoading } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [comment, setComment] = useState([]);
    const [editContent, setEditContent] = useState(post.content); // State for edit mode
    const [image, setImage] = useState(null);
    const [editImage, setEditImage] = useState(post.image); // State for edit mode
    const [content, setContent] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);

    const maxContentLength = 180;
    const truncatedContent = post.content.length > maxContentLength ? post.content.slice(0, maxContentLength) + "..." : post.content;
    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };
    const handleEditOptions = () => {
        setShowEditModal(!showEditModal);
    };

    const handleEditContentChange = (e) => {
        setEditContent(e.target.value);
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditImage(file);
        }
    };

    const handleSubmitEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('content', editContent);
            if (editImage) {
                formData.append('image', editImage);
            }

            await axios.put(`${server}/api/post/${post._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            toast.success('Post updated successfully');
            setRefresh((prev) => !prev);
            setShowEditModal(false);
        } catch (error) {
            toast.error(error.response.data.message || 'Failed to update post');
            console.log(error);
        }
    };
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

    const deletePost = async () => {
        try {
            await axios.delete(`${server}/api/post/${post._id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            toast.success("Post deleted successfully..");
            setRefresh((prev) => !prev);
        } catch (error) {
            toast.error(error.response.data.message || "Post deleted....");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(false);
            try {
                const { data } = await axios.get(`${server}/api/post/comment/${post._id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const reversedComments = data.comments.reverse();
                setComment(reversedComments);
                setRefresh((prev) => !prev);
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [post._id, refresh]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.content,
                    url: window.location.origin + '/post/' + post._id
                });
                toast.success("Successfully shared")
            } catch (error) {
                console.error("Error sharing:", error);
                toast.error("Error sharing:", error)
            }
        } else {
            console.log("Web Share API not supported");
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="post">
            <div className="post-author relative">
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
                {isAuthenticated && user._id === post.user._id && (
                    <span className="absolute right-4 top-0 mt-2 mr-2 font-extrabold text-gray-500 hover:text-black cursor-pointer" onClick={handleToggleOptions} >...</span>
                )}

                {showOptions && (
                    <div className="absolute right-6 top-10 w-30 text-black bg-white shadow-lg rounded-md p-2">
                        <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={deletePost}>
                            Delete
                        </button>
                        <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={handleEditOptions}>
                            Edit
                        </button>
                        <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={() => console.log('Delete')}>
                            Send
                        </button>
                    </div>
                )}
                {/* Modal for editing post */}
                {showEditModal && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
                        <textarea rows="4" value={editContent} onChange={handleEditContentChange} placeholder="Enter your post text" className="w-full border rounded-md p-2 mb-4"></textarea>
                        <input type="file" accept="image/*" onChange={handleEditImageChange} className="mb-4" />
                        <button onClick={handleSubmitEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                        <button onClick={() => setShowEditModal(false)} className="ml-2 text-gray-500 hover:text-gray-700">Close</button>
                    </div>
                )}

            </div>
            <p>
                {showFullContent ? formatContent(post.content) : truncatedContent}
                {post.content.length > maxContentLength && !showFullContent && (
                    <span className="text-blue-500 cursor-pointer" onClick={toggleContent}>Read More</span>
                )}
            </p>
            {post.image && post.image.trim() !== "" ? (
                <div className='image-container'>
                    <img src={post.image} alt="" className="post-image" />
                </div>
            ) : (null)}

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
                    <button onClick={() => setShowModal(!showModal)}><span className=' font-semibold'>Comment</span></button>
                </div>
                <div className="post-activity-link hover:cursor-pointer" onClick={handleShare}>
                    <img src="images/share.png" alt="Share" />
                    <span className=' font-semibold'>Share</span>
                </div>
                {/* <div className="post-activity-link">
                    <img src="images/send.png" alt="Send" />
                    <span>Send</span>
                </div> */}
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
