import React, { useContext, useEffect, useState } from 'react';
import Post from '../components/Post';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import Loader from '../components/Loader';


function UserDashboard() {
    const [users, setUser] = useState({});
    const [educationData, setEducationData] = useState([]);
    const [experienceData, setExperienceData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [modalType, setModalType] = useState("");
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [newExperience, setNewExperience] = useState({
        position: '',
        company: '',
        start_date: '',
        end_date: '',
        desc: ''
    })
    const [newEducation, setNewEducation] = useState({
        institution: '',
        degree: '',
        start_date: '',
        end_date: '',
    })
    const [showModal, setShowModal] = useState(false);
    const [editExperience, setEditExperience] = useState(null);
    const [editEducation, setEditEducation] = useState(null);

    const { user, isAuthenticated, setIsAuthenticated, setLoading, loading } = useContext(Context);
    const userId = useParams().id;

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


    useEffect(() => {
        fetchData();
        fetPostById();
    }, [userId, refresh]);

    const fetchData = async () => {

        try {
            const userData = await fetchUserData();
            setUser(userData);

            const [educationData, experienceData] = await Promise.all([
                fetchEducationData(),
                fetchExperienceData()
            ]);

            setEducationData(educationData);
            setExperienceData(experienceData);
            //setRefresh((prev) => !prev);

        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error("Failed to fetch user data");
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        const response = await axios.get(`${server}/api/users/${userId}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    };

    const fetchEducationData = async () => {
        try {
            const response = await axios.get(`${server}/api/education/${userId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            return response.data.education;
        } catch (error) {
            console.error('Error fetching education data:', error);
            toast.error("Failed to fetch education data");
            return [];
        }
    };

    const fetchExperienceData = async () => {
        try {
            const response = await axios.get(`${server}/api/experiance/${userId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            return response.data.experience;
        } catch (error) {
            console.error('Error fetching experience data:', error);
            toast.error("Failed to fetch experience data");
            return [];
        }
    };

    const fetPostById = async () => {
        try {
            const response = await axios.get(`${server}/api/post/${userId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setPosts(response.data.post);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error("Failed to fetch user posts");
        }
    };

    const handleEducationSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${server}/api/education`, newEducation, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setEducationData([...educationData, response.data]);
            toast.success("Education added successfully");
            setShowModal(false);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const handleDeleteEducation = async (educationId) => {
        try {
            await axios.delete(`${server}/api/education/${educationId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setExperienceData(educationData.filter(edu => edu._id !== educationId));
            toast.success("Education deleted successfully");
            setRefresh((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const handleEditEducationSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${server}/api/education/${editEducation._id}`, editEducation, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            setEducationData(educationData.map(edu => (edu._id === editEducation._id ? response.data : edu)));
            toast.success("Education updated successfully");
            setEditEducation(null);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const handleExperienceSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${server}/api/experiance`, newExperience, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setExperienceData([...experienceData, response.data]);
            toast.success("Experience added successfully");
            setShowModal(false);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const handleDeleteExperience = async (experienceId) => {
        try {
            await axios.delete(`${server}/api/experiance/${experienceId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setExperienceData(experienceData.filter(exp => exp._id !== experienceId));
            toast.success("Experience deleted successfully");
            setRefresh((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const handleEditExperienceSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${server}/api/experiance/${editExperience._id}`, editExperience, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            // Update experienceData with the modified experience details
            setExperienceData(experienceData.map(exp => (exp._id === editExperience._id ? response.data : exp)));
            toast.success("Experience updated successfully");
            setEditExperience(null);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        async function fetchChats() {
            setLoading(true);
            try {
                const response = await axios.get(`${server}/api/messages/chats`, {
                    withCredentials: true
                });
                setChats(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chats:', error);
                setLoading(false);
            }
        }
        fetchChats();
    }, []);


    const handleCreateChat = async () => {
        try {
            const response = await axios.get(`${server}/api/messages/chats`, {
                withCredentials: true
            });

            // Check if an existing chat with the user exists
            const existingChat = response.data.find(chat => chat.participants.includes(users._id));
            if (existingChat) {
                navigate(`/chat/${existingChat._id}`);
            } else {
                const response = await axios.post(`${server}/api/messages/chats`, { participant: users._id }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                const newChatId = response.data._id;
                setChatId(newChatId);
                navigate(`/chat/${newChatId}`);
            }

        } catch (error) {
            navigate("/mymessage");
            toast.error("Failed to load chat");
            console.log(error)
        }
    }
    console.log(chatId)

    const handleRef = () => {
        const confirmation = window.prompt('Are you sure you want to send a reference to this user?');
        if (confirmation) {
            // User confirmed
            alert('Reference sent successfully to the user!');
        } else {
            // User canceled or dismissed the prompt
            alert('Reference sending canceled.');
        }
    };
    // Check if user exists before rendering
    if (loading) {
        return <Loader />;
    }

    return (
        <div className="grid grid-cols-1  gap-6 p-0">
            <div className="bg-white border rounded-md shadow-md">
                <img src={users.profilePicture || 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'} className="w-full h-40 object-cover rounded-t-md opacity-60" alt="Banner" />

                <div className="px-6 py-4">
                    <img src={users.profilePicture || 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg'} alt="Profile" className="w-20 h-20 object-cover rounded-full mb-4" />
                    <p className="font-bold text-xl">{users.username}</p>
                    <p className="text-gray-600">{users.headline}</p>

                    <p className="text-sm"><span>{users.country}</span> <span>{users.city}</span></p>
                    <p className="text-sm">0 followers</p>

                    <div className="mt-6 space-x-2">
                        <button className="px-4 py-1 rounded-2xl font-semibold border text-blue-700 bg-transparent hover:bg-blue-100">My Network</button>
                        <button onClick={handleCreateChat} className="px-4 py-1 rounded-2xl font-semibold border text-blue-700 bg-transparent hover:bg-blue-100">Message</button>
                        <button onClick={handleRef} className="px-4 py-1 rounded-2xl font-semibold border text-blue-700 bg-transparent hover:bg-blue-100">Ref</button>
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-md shadow-md">
                <div className='px-6 py-4 flex justify-between '>
                    <div>
                        <h2 className="text-xl font-bold ">Activity</h2>
                        <p className="text-sm">0 followers</p>
                    </div>
                    <div>
                        <button className="px-4 py-2 rounded-2xl font-bold border text-blue-700 bg-transparent hover:bg-green-600">Create Posts</button>
                    </div>

                </div>

                <div className="flex space-x-2 mb-4 ml-7">
                    <button className="px-3 py-2 rounded-2xl bg-transparent border hover:bg-blue-100">Posts</button>
                </div>

                <div className=" container justify-center">
                    <div className='post'>
                        {/* Render each post */}
                        {posts.map(post => (
                            <div key={post._id} className="post md:w-[500px] border rounded-r-md">
                                <div className="post-author">
                                    <img src={post.user.profilePicture} alt="Author" />
                                    <div>
                                        <Link className='hover:underline' to={`/userdashboard/${post.user._id}`}><h1>{post.user.username}</h1></Link>
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
                                        <img src="/images/thumbsup.png" alt="Thumbs Up" />
                                        <span className="liked-users">{post.likes.length} Likes</span>
                                    </div>
                                    <div>
                                        <span>{post.comments.length} Comments</span>
                                    </div>
                                </div>
                                {/* <div>
                                    {post.comments.map(comment => (
                                        <div key={comment._id} className='comment'>

                                            <div>
                                                <p>{comment.postId}</p>
                                                <p>{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}
                                <div className="post-activity">
                                    <div className="post-activity-link">
                                        <img src="/images/like.png" alt="Like" />
                                        <LikeButton postId={post._id} />
                                    </div>
                                    <div className="post-activity-link">
                                        <img src="/images/comment.png" alt="Comment" />
                                        <span>Comment</span>
                                    </div>
                                    <div className="post-activity-link">
                                        <img src="/images/share.png" alt="Share" />
                                        <span>Share</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">About</h2>
                <div className="px-6 py-4">
                    <p className="text-gray-700 p-2 leading-1">
                        {users.bio}
                    </p>
                </div>
            </div>

            {/* Experience Form */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full sm:w-96">
                        <div className=' p-5'>
                            {modalType === 'experience' && (
                                <>
                                    < h2 className="text-xl font-bold mb-4">Add Experience</h2>
                                    <form onSubmit={handleExperienceSubmit} className="px-6 py-4">
                                        {/* Form inputs for new experience */}
                                        <div className="mb-4">
                                            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                                            <input type="text" id="position" name="position" value={newExperience.position} onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                                            <input type="text" id="company" name="company" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                            <input type="date" id="start_date" name="start_date" value={newExperience.start_date} onChange={(e) => setNewExperience({ ...newExperience, start_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                            <input type="date" id="end_date" name="end_date" value={newExperience.end_date} onChange={(e) => setNewExperience({ ...newExperience, end_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea id="desc" name="desc" value={newExperience.desc} onChange={(e) => setNewExperience({ ...newExperience, desc: e.target.value })} rows="3" className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                                        </div>
                                        <div className="flex justify-center">
                                            <button type="submit" className="px-4 py-2 rounded-md font-bold border text-blue-700 bg-transparent hover:bg-blue-600 mr-2">Add Experience</button>
                                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md font-bold border text-red-700 bg-transparent hover:bg-red-100">Cancel</button>
                                        </div>
                                    </form>
                                </>)}
                            {modalType === 'education' && (
                                <>
                                    < h2 className="text-xl font-bold mb-4">Add Education</h2>
                                    <form onSubmit={handleEducationSubmit} className="px-6 py-4">
                                        {/* Form inputs for new experience */}
                                        <div className="mb-4">
                                            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Institution</label>
                                            <input type="text" id="institution" name="institution" value={newEducation.institution} onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Degree</label>
                                            <input type="text" id="degree" name="degree" value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                            <input type="date" id="start_date" name="start_date" value={newEducation.start_date} onChange={(e) => setNewEducation({ ...newEducation, start_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                            <input type="date" id="end_date" name="end_date" value={newEducation.end_date} onChange={(e) => setNewEducation({ ...newEducation, end_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="flex justify-center">
                                            <button type="submit" className="px-4 py-2 rounded-md font-bold border text-blue-700 bg-transparent hover:bg-blue-600 mr-2">Add Education</button>
                                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md font-bold border text-red-700 bg-transparent hover:bg-red-100">Cancel</button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {editExperience && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full sm:w-96">
                        <div className=' p-5'>
                            <h2 className="text-xl font-bold mb-4">Edit Experience</h2>
                            <form onSubmit={handleEditExperienceSubmit} className="px-6 py-4">
                                <div className="mb-4">
                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                                    <input type="text" id="position" name="position" value={editExperience.position} onChange={(e) => setEditExperience({ ...editExperience, position: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                                    <input type="text" id="company" name="company" value={editExperience.company} onChange={(e) => setEditExperience({ ...editExperience, company: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input type="date" id="start_date" name="start_date" value={editExperience.start_date} onChange={(e) => setEditExperience({ ...editExperience, start_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input type="date" id="end_date" name="end_date" value={editExperience.end_date} onChange={(e) => setEditExperience({ ...editExperience, end_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea id="desc" name="desc" value={editExperience.desc} onChange={(e) => setEditExperience({ ...editExperience, desc: e.target.value })} rows="3" className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="px-4 py-2 rounded-md font-bold border text-blue-700 bg-transparent hover:bg-blue-600 mr-2">Update</button>
                                    <button type="button" onClick={() => setEditExperience(null)} className="px-4 py-2 rounded-md font-bold border text-red-700 bg-transparent hover:bg-red-100">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {editEducation && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full sm:w-96">
                        <div className=' p-5'>
                            <h2 className="text-xl font-bold mb-4">Edit Education</h2>
                            <form onSubmit={handleEditEducationSubmit} className="px-6 py-4">
                                <div className="mb-4">
                                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution</label>
                                    <input type="text" id="institution" name="institution" value={editEducation.institution} onChange={(e) => setEditEducation({ ...editEducation, institution: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                                    <input type="text" id="degree" name="degree" value={editEducation.degree} onChange={(e) => setEditEducation({ ...editEducation, degree: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input type="date" id="start_date" name="start_date" value={editEducation.start_date} onChange={(e) => setEditEducation({ ...editEducation, start_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input type="date" id="end_date" name="end_date" value={editEducation.end_date} onChange={(e) => setEditEducation({ ...editEducation, end_date: e.target.value })} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="px-4 py-2 rounded-md font-bold border text-blue-700 bg-transparent hover:bg-blue-600 mr-2">Update</button>
                                    <button type="button" onClick={() => setEditEducation(null)} className="px-4 py-2 rounded-md font-bold border text-red-700 bg-transparent hover:bg-red-100">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}




            <div className="bg-white border rounded-md shadow-md">
                <div className=' flex justify-between'>
                    <h2 className="text-xl font-bold px-6 py-4 border-b">Experience</h2>
                    {/* Button to add new experience */}
                    {isAuthenticated && user._id === userId && (
                        <div className="flex items-center gap-2 mr-8">
                            <button onClick={() => { setShowModal(true); setModalType('experience') }} className="flex items-center px-4 py-2 rounded-md font-bold border text-blue-500 bg-transparent hover:bg-blue-600">
                                <FaPlus className="mr-2" />
                                ADD
                            </button>
                        </div>
                    )}

                </div>

                <div className="px-6 py-4">
                    <ol className="list-decimal">
                        <div className="border border-gray-300 rounded-lg p-4">
                            {experienceData && experienceData.length > 0 ? (
                                <ol className="list-decimal">
                                    {experienceData.map((exp, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="font-semibold">{exp.company}</h3>
                                            <p className="text-gray-600">{exp.position}</p>
                                            <p className="text-gray-600">{exp.desc}</p>
                                            <p className="text-gray-500">
                                                {new Date(exp.start_date).toLocaleDateString()} - {new Date(exp.end_date).toLocaleDateString()}

                                            </p>
                                            {
                                                isAuthenticated && user._id === exp.user && (
                                                    <div className="flex items-center gap-2 mr-8 mt-3">
                                                        <button onClick={() => handleDeleteExperience(exp._id)} className="flex items-center px-4 py-2 rounded-md font-bold border text-red-500 bg-transparent hover:bg-red-600">
                                                            <MdDelete className="mr-2" />
                                                        </button>
                                                        <button onClick={() => setEditExperience(exp)} className="flex items-center px-4 py-2 rounded-md font-bold border text-yellow-500 bg-transparent hover:bg-yellow-600">
                                                            <FaEdit className="mr-2" />
                                                        </button>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ))}
                                </ol>
                            ) : (
                                <p>No experiance data available</p>
                            )}
                        </div>


                    </ol>
                </div>

            </div>

            <div className="bg-white border rounded-md shadow-md">
                <div className=' flex justify-between'>
                    <h2 className="text-xl font-bold px-6 py-4 border-b">Education</h2>
                    {isAuthenticated && user._id === userId && (
                        <div className="flex items-center gap-2 mr-8">
                            <button onClick={() => { setShowModal(true); setModalType('education') }} className="flex items-center px-4 py-2 rounded-md font-bold border text-blue-500 bg-transparent hover:bg-blue-600">
                                <FaPlus className="mr-2" />
                                ADD
                            </button>
                        </div>
                    )}

                </div>

                <div className="px-6 py-4">
                    <div className="border border-gray-300 rounded-lg p-4">
                        {educationData && educationData.length > 0 ? (
                            <ol className="list-decimal">
                                {educationData.map((edu, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="font-semibold">{edu.institution}</h3>
                                        <p className="text-gray-600">{edu.degree}</p>
                                        <p className="text-gray-500">
                                            {new Date(edu.start_date).toLocaleDateString()} - {new Date(edu.end_date).toLocaleDateString()}
                                        </p>

                                        {isAuthenticated && user._id === edu.user && (

                                            <div className="flex items-center gap-2 mr-8 mt-3">
                                                <button onClick={() => handleDeleteEducation(edu._id)} className="flex items-center px-4 py-2 rounded-md font-bold border text-red-500 bg-transparent hover:bg-red-600">
                                                    <MdDelete className="mr-2" />
                                                </button>
                                                <button onClick={() => setEditEducation(edu)} className="flex items-center px-4 py-2 rounded-md font-bold border text-yellow-500 bg-transparent hover:bg-yellow-600">
                                                    <FaEdit className="mr-2" />
                                                </button>
                                            </div>

                                        )}

                                    </div>
                                ))}
                            </ol>
                        ) : (
                            <p>No education data available</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">Skills</h2>
                <div className="px-6 py-4">
                    <ul className="list-group">
                        {users.skills}
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default UserDashboard;
