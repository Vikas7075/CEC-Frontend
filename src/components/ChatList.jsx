import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context, server } from '../main';

function ChatList({ onChatSelect }) {
    const [chats, setChats] = useState([]);
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);

    useEffect(() => {
        async function fetchChats() {
            const response = await axios.get(`${server}/api/messages/chats`, {
                withCredentials: true
            });
            setChats(response.data);
            // Find existing chat with current user
            const existingChat = response.data.find(chat => chat.participants.includes(user._id));
            if (existingChat) {
                // If a chat already exists, navigate to that chat
                navigate(`/chat/${existingChat._id}`);
            }
        }
        fetchChats();
    }, []);

    const handleChatClick = (chatId) => {
        onChatSelect(chatId);
    };

    return (
        <div className="flex flex-col text-black overflow-y-auto">
            <div id="search-bar" class="w-120 bg-white rounded-md shadow-lg z-10">
                <form className="flex items-center justify-center p-2">
                    <input type="text" placeholder="Search friends"
                        className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" />
                    <button type="submit"
                        className="bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                        Search
                    </button>
                </form>
            </div>
            {/* Chat list */}
            {chats.map(chat => (
                <div key={chat._id} className="flex items-center p-4 cursor-pointer hover:bg-gray-200 border-b border-gray-300" onClick={() => handleChatClick(chat._id)}>
                    <img className='rounded-full w-12 h-12 mr-4' src={chat.participants[1].profilePicture} alt="Profile" />
                    <div>
                        <h3 className="text-lg font-semibold">{chat.participants[1].username}</h3>
                        <p className="text-sm">{chat.lastMessage ? chat.lastMessage.text : "No message"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatList;
