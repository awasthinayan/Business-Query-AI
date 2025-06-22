import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UserCircleIcon } from '@heroicons/react/24/solid'; 
import { motion } from 'framer-motion';
import 'chart.js/auto'; 
import '../index.css';
import Graph from '../Graph'; 
import process from 'process';

function DashboardPage() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [graphData, setGraphData] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (query.trim() === '') return;

    // Retrieve the API key from the environment variable
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // Use the apiKey variable here
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Or gpt-4 if you have access
          messages: [{ role: 'user', content: query }],
        }),
      });
  
      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "Sorry, I couldn't understand.";
  
      let newGraphData = null;
      if (query.toLowerCase().includes("sales") || query.toLowerCase().includes("growth")) {
        newGraphData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Projected Growth (%)',
              data: [10, 20, 30, 40, 50],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        };
      }
  
      setChatHistory([
        ...chatHistory,
        { user: query, ai: aiResponse }
      ]);
      setGraphData(newGraphData);
      setQuery('');
    } catch (error) {
      console.error("Error communicating with AI:", error);
    }
  };

  const goToProfile = () => {
    navigate('/Profile');
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Profile Icon */}
      <motion.div className="absolute top-8 right-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}>
        <button onClick={goToProfile}>
          <UserCircleIcon className="h-14 w-14 text-white hover:text-gray-300 hover:scale-110 transition cursor-pointer" />
        </button>
      </motion.div>

      {/* Glitch Welcome */}
      <motion.h1 className="relative text-3xl md:text-4xl font-extrabold text-white mb-8 text-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 100 }}>
        <span className="relative z-10 block">Welcome to Your Business Strategy Assistant 🚀</span>
        <span className="absolute top-0 left-0 w-full h-full text-white opacity-40 glitch-text glitch-1">Welcome to Your Business Strategy Assistant 🚀</span>
        <span className="absolute top-0 left-0 w-full h-full text-white opacity-40 glitch-text glitch-2">Welcome to Your Business Strategy Assistant 🚀</span>
      </motion.h1>

      {/* Main Card */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
          <motion.input
            type="text"
            placeholder="Ask your business query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
          <button
  type="submit"
  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition hover cursor-pointer"
>
  Send
</button>

        </form>

        {/* Chat Section */}
        <div className="space-y-8">
          {chatHistory.map((chat, index) => (
            <motion.div key={index} className="bg-gray-100 p-5 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + index * 0.2 }}>
              <p><strong className="text-indigo-700">You:</strong> {chat.user}</p>
              <p><strong className="text-green-700">AI:</strong> {chat.ai}</p>
            </motion.div>
          ))}
        </div>

        {/* Graph Section */}
        {graphData && (
          <motion.div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <h2 className="text-lg font-bold mb-4 text-center text-indigo-700">Generated Graph 📈</h2>
            <Graph graphData={graphData} /> {/* 👈 USING Graph component now */}
          </motion.div>
        )}

      </motion.div>
    </motion.div>
  );
}

export default DashboardPage;
