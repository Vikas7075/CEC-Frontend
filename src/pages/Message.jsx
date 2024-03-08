import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';

function Message() {
    const [selectedChatId, setSelectedChatId] = useState("");

    const handleChatSelect = (chatId) => {
        setSelectedChatId(chatId);
    };

    return (
        <div className="flex flex-col md:flex-row container">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-gray-100 border-r border-black-400 overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-lg font-extrabold mb-4">My Chats</h2>
                    <ChatList onChatSelect={handleChatSelect} />
                </div>
            </div>

            {/* Main Chat Area */}
            <div className=" w-screen md:w-3/4 flex flex-col">
                {/* Header */}
                {selectedChatId && (
                    <div className="p-4 bg-white border-b border-gray-200">
                        <h2 className="text-lg font-bold">Chat</h2>
                    </div>
                )}

                {/* Chat Box */}
                <div className="flex-1 overflow-y-auto w-full">
                    {selectedChatId ? (
                        <ChatBox chatId={selectedChatId} />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Select a chat to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Message;
