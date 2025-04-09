import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Feedback() {
    const [formTitle, setTitle] = useState('');
    const [formDescription, setDescription] = useState('');
    const [formName, setName] = useState('');

    const navigate = useNavigate();

    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: formTitle,
            description: formDescription,
            name: formName
        }
        console.log('Feedback submitted:', formData);

        const respond = await fetch(`https://feedbackserver-lfek.onrender.com/feedback/submit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        const result_dest = await respond.json();
        if(result_dest.success=='OK')
        {
            alert("Feedback has submitted");
        }
        console.log(result_dest);

    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <div className='flex w-full justify-end gap-6'>
                <p className='text-lg font-semibold cursor-pointer hover:text-orange-400' onClick={() => { navigate('/') }}>Home</p>
                <p className='text-lg font-semibold cursor-pointer' onClick={logout}>logout</p>
            </div>
        <div className="flex justify-center items-center p-4">
            
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Product Feedback
                </h2>


                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium" >
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="feedback title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium" >
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={(e) => { setDescription(e.target.value) }}
                        required
                        rows="4"
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your experience..."
                    ></textarea>
                </div>

                {/* User Name (Optional) */}
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="username">
                        Your Name <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => { setName(e.target.value) }}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="user name"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit" onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                    Submit Feedback
                </button>
            </div>
        </div>
        </div>
    )
}