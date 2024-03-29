import React from 'react';

function Dashboard() {
  // Dummy data for demonstration
  const totalUsers = 6;
  const totalPosts = 10;
  const totalLikes = 5;
  const totalComments = 5;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <p className="text-gray-600">Total Users: {totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Posts</h3>
          <p className="text-gray-600">Total Posts: {totalPosts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Likes</h3>
          <p className="text-gray-600">Total Likes: {totalLikes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <p className="text-gray-600">Total Comments: {totalComments}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
