import React, { useState } from 'react';

function RegisterForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        country: '',
        district: '',
        profile: '',
        name: '',
        email: '',
        password: '',
        userType: '',
        collegeName: '',
        degreeName: '',
        startDate: '',
        endDate: '',
        currentEmployee: '',
        company: '',
        designation: '',
        dob: '',
        gender: '',
        bio: '',
        skills: '',
        achievements: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (step === 4) {
            // Submit the form data
            console.log(formData);
            // Reset the form data
            setFormData({
                country: '',
                district: '',
                profile: '',
                name: '',
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
                designation: '',
                skills: '',
                achievements: ''
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
                        <input type="text" name="district" value={formData.district} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h1 className="text-center text-xl font-bold mb-8">Your Profile helps you discover new people and opportunity</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
                        <input type="file" name="profile" value={formData.profile} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                        <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Degree Name *</label>
                        <input type="text" name="degreeName" value={formData.degreeName} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                        <textarea rows="3" name="achievements" value={formData.achievements} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
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
