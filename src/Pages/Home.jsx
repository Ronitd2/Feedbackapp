import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const logout=(e)=>{
  e.preventDefault();
  localStorage.removeItem('token');
  navigate('/login');
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respond = await fetch(`https://feedbackserver-lfek.onrender.com/feedback/query/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result_dest = await respond.json();
        console.log(result_dest);
        setFeedbacks(result_dest.feedbacks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setLoading(false);
      }
    };
    if(!localStorage.getItem('token')){
      navigate('/login')
   }
   else{
    fetchData();
   }
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className='flex w-full justify-end gap-6'>
        <p className='text-lg font-semibold cursor-pointer hover:text-orange-400' onClick={()=>{navigate('/feedback')}}>Give your Feedback</p>
        <p className='text-lg font-semibold cursor-pointer' onClick={logout}>logout</p>
    </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Feedbacks</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedback available yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id || feedback._id}
                className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{feedback.title}</h2>
                <p className="text-gray-600 mb-4">{feedback.description}</p>
                {/* {feedback.username && (
                  <p className="text-sm text-gray-500">
                    — <span className="italic">{feedback.username}</span>
                  </p>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
