import React from 'react'
import Sidebar from '../components/Admin/Sidebar'
import Dashboard from '../components/Admin/Dashboard'
import Users from '../components/Admin/Users'

const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow p-4">
                <Dashboard />
                <Users />
            </div>
        </div>
    )
}

export default AdminDashboard