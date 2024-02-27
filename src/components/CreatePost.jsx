import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

const CreatePost = () => {
    // State variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);

    // Function to handle opening modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to handle closing modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to handle text input change
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    // Function to handle image input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        // Create form data
        const formData = new FormData();
        formData.append('content', text);
        formData.append('image', image);


        try {
            // Send form data to backend API
            const response = await axios.post(`${server}/api/post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            console.log(response.data);
            toast.success("Post Created Successfully");
            // Close the modal after successful submission
            closeModal();
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error if submission fails
            toast.error(error);
        }
    };

    return (
        <form>
            <div className="create-post">
                <div className="create-post-input">
                    <img src="https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg" alt="User" />
                    <textarea className=' hover:cursor-pointer' rows="2" placeholder="Create a post" onClick={openModal}></textarea>
                </div>
                {/* Modal for adding text and image */}
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
                    <textarea rows="4" value={text} required onChange={handleTextChange} placeholder="Enter your post text" className="w-full border rounded-md p-2 mb-4"></textarea>
                    <input type="file" required accept="image/*" onChange={handleImageChange} className="mb-4" />
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                    <button onClick={closeModal} className="ml-2 text-gray-500 hover:text-gray-700">Close</button>
                </Modal>
                <div className="create-post-links">
                    {/* Add photo, video, and event options */}
                    <li><img src="images/photo.png" alt="Photo" />Photo</li>
                    <li><img src="images/video.png" alt="Video" />Video</li>
                    <li><img src="images/event.png" alt="Event" />Event</li>
                    {/* Post button - You can keep this button outside the modal */}
                    <li><button onClick={openModal}>Post</button></li>
                </div>
            </div>
        </form>
    );
};

export default CreatePost;
