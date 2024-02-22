import React from 'react';
import Post from '../components/Post';

function UserDashboard() {
    return (
        <div className="grid grid-cols-1  gap-6 p-8">
            <div className="bg-white border rounded-md shadow-md">
                <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" className="w-full h-40 object-cover rounded-t-md" alt="Banner" />

                <div className="px-6 py-4">
                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Profile" className="w-20 h-20 object-cover rounded-full mb-4" />
                    <p className="font-bold text-xl">Aryan Agrawal</p>
                    <p className="text-gray-600">Mentorsity | Digital Creator | Web3 Enthusiast</p>

                    <p className="text-sm">Prayagraj, Uttar Pradesh, India</p>
                    <p className="text-sm">867 followers</p>

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
                        <p className="text-sm">867 followers</p>
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
                    <Post />

                </div>

            </div>

            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">About</h2>
                <div className="px-6 py-4">
                    <p className="text-gray-700 p-2 leading-1">
                        I Aryan Agrawal, am a passionate content creator and tech-enthusiast. I have skills including UI designing, Problem-solving skills, and Programming skills in the IT sector as well as Marketing, Communication, and Business Development skills in the Business Sector.
                    </p>
                </div>
            </div>


            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">Experience</h2>
                <div className="px-6 py-4">
                    <ol className="list-decimal">
                        <div className="border border-gray-300 rounded-lg p-4">
                            <div className="mb-4">
                                <h3 className="font-semibold">Software Engineer</h3>
                                <p className="text-gray-600">XYZ Corp</p>
                                <p className="text-gray-500">Jan 2020 - Present</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Intern</h3>
                                <p className="text-gray-600">ABC Company</p>
                                <p className="text-gray-500">Jun 2018 - Dec 2019</p>
                            </div>
                        </div>


                    </ol>
                </div>
            </div>

            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">Education</h2>
                <div className="px-6 py-4">
                    <div className="border border-gray-300 rounded-lg p-4">
                        <div className="mb-4">
                            <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                            <p className="text-gray-600">University of Example</p>
                            <p className="text-gray-500">2015 - 2019</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">High School Diploma</h3>
                            <p className="text-gray-600">Example High School</p>
                            <p className="text-gray-500">2011 - 2015</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-md shadow-md">
                <h2 className="text-xl font-bold px-6 py-4 border-b">Achievements & Certifications</h2>
                <div className="px-6 py-4">
                    <ul className="list-group">
                        {/* Achievement items */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
