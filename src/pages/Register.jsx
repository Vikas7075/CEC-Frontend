import React, { useContext, useState } from 'react';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function RegisterForm() {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    console.log(isAuthenticated)

    const [formData, setFormData] = useState({
        country: '',
        city: '',
        profilePicture: null,
        username: '',
        email: '',
        password: '',
        userType: '',
        college: '',
        degree: '',
        startDate: '',
        endDate: '',
        currentEmployee: '',
        company: '',
        designation: '',
        dob: '',
        gender: '',
        bio: '',
        skills: '',
        headline: '',
        achievments: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = e => {
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            profilePicture: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 4) {
            try {
                const formDataToSend = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
                });
                const { data } = await axios.post(`${server}/api/users/`, formDataToSend);
                console.log(data.message);
                console.log(data);
                toast.success(data.message);
                setIsAuthenticated(true);
                navigate("/");
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error.response.data.message);
                setIsAuthenticated(false);
            }
            // Submit the form data
            console.log(formData);
            // Reset the form data
            setFormData({
                country: '',
                city: '',
                profilePicture: null,
                username: '',
                email: '',
                password: '',
                userType: '',
                collegeName: '',
                degreeName: '',
                startDate: '',
                endDate: '',
                currentEmployee: '',
                company: '',
                dob: '',
                gender: '',
                bio: '',
                headline: '',
                designation: '',
                skills: '',
                achievments: ''
            });
            // Reset the step
            setStep(1);
            // You can perform additional actions like sending the data to the server or displaying a success message
        } else {
            setStep(prevStep => prevStep + 1);
        }
    };

    return (
        <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-10">
            {step === 1 && (
                <>
                    <div className=' mb-8'>
                        <h1 className="text-center text-xl font-bold mb-1">Welcome, What's your location?</h1>
                        <p className=' text-center'>See people in your area.</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Country/Region*</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">City/District*</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h1 className="text-center text-xl font-bold mb-8">Your Profile helps you discover new people and opportunity</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
                        <input type="file" name="profilePicture" onChange={handleImageChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">GENDER:</label>
                        <div>
                            <input type="radio" name="gender" id="male" className="mr-2 leading-tight" />
                            <label htmlFor="male" className="text-sm text-gray-700 mr-4">Male</label>
                            <input type="radio" name="gender" id="female" className="mr-2 leading-tight" />
                            <label htmlFor="female" className="text-sm text-gray-700 mr-4">Female</label>
                            <input type="radio" name="gender" id="other" className="mr-2 leading-tight" />
                            <label htmlFor="other" className="text-sm text-gray-700">Prefer Not To Say</label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Bio:</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Headline:</label>
                        <textarea name="headline" value={formData.headline} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">User Type:</label>
                        <select name="userType" value={formData.userType} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select User Type</option>
                            <option value="student">Student</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>
                </>
            )}



            {step === 3 && formData.userType === 'student' && (
                <>
                    <h1 className="text-center text-xl font-bold mb-8">Your Profile helps you discover new people and opportunity</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">College/University *</label>
                        <input type="text" name="college" value={formData.college} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Degree Name *</label>
                        <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Start Date *</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">End Date *</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </>
            )}

            {step === 3 && formData.userType === 'professional' && (
                <>
                    <h1 className="text-center text-xl font-bold mb-8">Your Profile helps you discover new people and opportunity</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Current Employee *</label>
                        <input type="text" name="currentEmployee" value={formData.currentEmployee} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Designation/Role *</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Start Date *</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </>
            )}

            {step === 4 && (
                <>
                    <h1 className="text-center text-2xl font-bold mb-8">Skills and Achievements</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Skills:</label>
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Achievements/Certifications:</label>
                        <textarea rows="3" name="achievments" value={formData.achievments} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                </>
            )}

            <div className="flex justify-between">
                {step > 1 && (
                    <button onClick={() => setStep(prevStep => prevStep - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
                )}
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{step === 4 ? 'Submit' : 'Continue'}</button>
            </div>
        </form>
    );
}

export default RegisterForm;
