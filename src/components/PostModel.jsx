// PostModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const PostModal = ({ isOpen, closeModal }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = () => {
        // Handle form submission (e.g., send data to backend)
        // You can access 'text' and 'image' state here
        // Close modal after submission
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>Create a Post</h2>
            <textarea value={text} onChange={handleTextChange} placeholder="Enter your post text"></textarea>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleSubmit}>Submit</button>
        </Modal>
    );
};

export default PostModal;
