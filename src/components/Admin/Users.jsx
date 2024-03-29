import React from 'react';

function Users() {
    // Dummy user data for demonstration
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 4, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 5, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 6, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 7, name: 'Jane Smith', email: 'jane@example.com' },
        // Add more users as needed
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
