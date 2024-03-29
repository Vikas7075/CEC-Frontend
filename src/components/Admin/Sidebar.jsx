import React from 'react';

function Sidebar() {
  return (
    <div className="bg-gray-900 text-white w-64 flex-shrink-0 p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <ul>
        <li className="mb-2"><a href="#" className="block px-2 py-1 rounded hover:bg-gray-800">Dashboard</a></li>
        <li className="mb-2"><a href="#" className="block px-2 py-1 rounded hover:bg-gray-800">Users</a></li>
        <li className="mb-2"><a href="#" className="block px-2 py-1 rounded hover:bg-gray-800">Posts</a></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
