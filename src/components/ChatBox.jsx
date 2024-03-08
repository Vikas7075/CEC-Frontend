import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context, server } from '../main';
import { calculateTimeDifference } from '../utils/timeUtils';

function ChatBox({ chatId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchMessages() {
            const response = await axios.get(`${server}/api/messages/chats/${chatId}`, {
                withCredentials: true
            });
            setMessages(response.data);
        }
        fetchMessages();
    }, [chatId, refresh]);

    const sendMessage = async () => {
        await axios.post(`${server}/api/messages/send`, { chatId, text: newMessage }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        setNewMessage('');
        setRefresh((prev) => !prev);
        // Refresh messages
        // fetchMessages();
    };

    return (
        <div className="flex flex-col h-full w-full max-w-sm">
            {/* Chat messages */}
            <div className="flex-col items-center justify-center">
                {messages.map(message => (
                    <div key={message._id} className="mb-4 bg-gray-100 rounded-lg px-4 py-2 max-w-[100%]">
                        <div className=' flex flex-1 content-center items-center'>
                            <img className='rounded-full w-10 h-10 mr-4' src={message.sender.profilePicture} alt="Profile" />
                            <p className="font-bold">{message.sender.username} .</p>
                            <p className="text-gray-600 text-xs text-right leading-none ml-2">{calculateTimeDifference(message.createdAt)}</p>
                        </div>
                        <p className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-gray-300 flex flex-col relative speech-bubble-right">{message.text}</p>
                    </div>
                ))}
            </div>

            {/* Chat input */}
            <div className="flex justify-center items-center h-16">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
                    placeholder="Type a message..."
                    required
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBox;
