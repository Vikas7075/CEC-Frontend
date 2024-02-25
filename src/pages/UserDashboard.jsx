import React, { useContext, useEffect, useState } from 'react';
import Post from '../components/Post';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function UserDashboard() {
    const [user, setUser] = useState({});
    const [educationData, setEducationData] = useState([]);

    const { setIsAuthenticated, setLoading } = useContext(Context);
    const userId = useParams().id;
    // //const id = "65d819f1604aae6153edf1c8"
    // console.log(userId)
    console.log(userId)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${server}/api/users/${userId}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true

                });
                console.log(data)
                setUser(data);
                toast.success(data.message);
                setIsAuthenticated(true);

                // Fetch education details for each education ID

                const eduResponse = await axios.get(`${server}/api/education/`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true

                });



                setEducationData(eduResponse.data);
                console.log(eduResponse.data.education)

            } catch (error) {
                toast.error(error.response.data.message);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

    }, []);
    //console.log(user)

    // Check if user exists before rendering
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1  gap-6 p-8">
            <div className="bg-white border rounded-md shadow-md">
                <img src={user.profilePicture || 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'} className="w-full h-40 object-cover rounded-t-md" alt="Banner" />

                <div className="px-6 py-4">
                    <img src={user.profilePicture || 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg'} alt="Profile" className="w-20 h-20 object-cover rounded-full mb-4" />
                    <p className="font-bold text-xl">{user.username}</p>
                    <p className="text-gray-600">{user.headline}</p>

                    <p className="text-sm"><span>{user.country}</span> <span>{user.city}</span></p>
                    <p className="text-sm">0 followers</p>

                    <div className="mt-6 space-x-2">
                        <button className="px-4 py-1 rounded-2xl font-semibold border text-blue-700 bg-transparent hover:bg-blue-100">My Connections</button>
                        <button className="px-4 py-1 rounded-2xl font-semibold border text-blue-700 bg-transparent hover:bg-blue-100">Messenger</button>
                        <button className="px-4 py-1 rounded-2xl font-semibold border text-blue-700 bg-transparent hover:bg-blue-100">More</button>
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
                    <button className="px-3 py-2 rounded-2xl bg-transparent border hover:bg-blue-100">Comments</button>
                    <button className="px-3 py-2 rounded-2xl bg-transparent border hover:bg-blue-100">Videos</button>
                    <button className="px-3 py-2 rounded-2xl bg-transparent border hover:bg-blue-100">Images</button>
                </div>

                <div className=" container justify-center">


                </div>

            </div>

            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">About</h2>
                <div className="px-6 py-4">
                    <p className="text-gray-700 p-2 leading-1">
                        {user.bio}
                    </p>
                </div>
            </div>


            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">Experience</h2>
                <div className="px-6 py-4">
                    <ol className="list-decimal">
                        <div className="border border-gray-300 rounded-lg p-4">
                            {user.experiance && user.experiance.length > 0 ? (
                                <ol className="list-decimal">
                                    {user.education.map((edu, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="font-semibold">{edu.employee}</h3>
                                            <p className="text-gray-600">{edu.designation}</p>
                                            <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
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
                <h2 className="text-xl font-bold px-6 py-4 border-b">Education</h2>
                <div className="px-6 py-4">
                    <div className="border border-gray-300 rounded-lg p-4">
                        {educationData.education && educationData.education.length > 0 ? (
                            <ol className="list-decimal">
                                {educationData.education.map((edu, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="font-semibold">{edu.degree}</h3>
                                        <p className="text-gray-600">{edu.institution}</p>
                                        <p className="text-gray-500">
                                            {new Date(edu.start_date).toLocaleDateString()} - {new Date(edu.end_date).toLocaleDateString()}
                                        </p>
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
                <h2 className="text-xl font-bold px-6 py-4 border-b">Achievements & Certifications</h2>
                <div className="px-6 py-4">
                    <ul className="list-group">
                        {user.skills}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
