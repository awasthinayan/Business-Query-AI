import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AuthPage({ setIsAuthenticated }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      const userExists = users.find((u) => u.email === formData.email);
      if (userExists) {
        setMessageType('error');
        setMessage('User already exists! Please login instead.');
        setIsRegistering(false);
      } else {
        setUsers([...users, formData]);
        setMessageType('success');
        setMessage('Registered Successfully! Please login now.');
        setIsRegistering(false);
      }
    } else {
      const validUser = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (validUser) {
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(validUser));
        navigate('/dashboard');
      } else {
        setMessageType('error');
        setMessage('Invalid email or password! Please try again.');
      }
    }

    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>

        {/* ✅ Clean Login/Register buttons with hover only */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => { setIsRegistering(false); setMessage(''); }}
            className={`px-5 py-2 mx-2 rounded-full font-semibold ${
              !isRegistering 
              ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer' 
              : 'bg-gray-200 text-black hover:bg-blue-300'
            }`}
          >
            Login
          </button>

          <button 
            onClick={() => { setIsRegistering(true); setMessage(''); }}
            className={`px-5 py-2 mx-2 rounded-full font-semibold ${
              isRegistering 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-gray-200 text-black hover:bg-purple-100 cursor-pointer'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {isRegistering && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button 
            type="submit" 
            className="bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 cursor-pointer"
          >
            {isRegistering ? "Register Now" : "Login"}
          </button>

          {message && (
            <p 
              className={`text-center mt-2 text-sm font-medium ${
                messageType === 'error' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AuthPage;
