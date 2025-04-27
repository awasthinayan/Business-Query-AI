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

  // Animation Variants
  const containerVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        staggerChildren: 0.2
      }
    }
  };

  const childVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-500"
      >
        <motion.h2
          className="text-4xl font-bold mb-8 text-center text-purple-700"
          variants={childVariant}
        >
          {isRegistering ? "Create Account" : "Welcome Back"}
        </motion.h2>

        <motion.div 
          className="flex justify-center mb-8"
          variants={childVariant}
        >
          <motion.button 
            onClick={() => { setIsRegistering(false); setMessage(''); }}
            whileHover={{ scale: 1.1 }}
            className={`px-5 py-2 mx-2 rounded-full transition-all duration-300 hover cursor-pointer ${
              !isRegistering ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            Login
          </motion.button>

          <motion.button 
            onClick={() => { setIsRegistering(true); setMessage(''); }}
            whileHover={{ scale: 1.1 }}
            className={`px-5 py-2 mx-2 rounded-full transition-all duration-300 hover cursor-pointer ${
              isRegistering ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            Register
          </motion.button>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {isRegistering && (
            <motion.input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              variants={childVariant}
              whileFocus={{ scale: 1.03 }}
              className="p-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          )}

          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            variants={childVariant}
            whileFocus={{ scale: 1.03 }}
            className="p-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            variants={childVariant}
            whileFocus={{ scale: 1.03 }}
            className="p-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <motion.button 
            type="submit" 
            className="bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition"
            variants={childVariant}
            whileHover={{ scale: 1.05 }}
          >
            {isRegistering ? "Register Now" : "Login"}
          </motion.button>

          {message && (
            <motion.p 
              className={`text-center mt-2 text-sm font-medium ${
                messageType === 'error' ? 'text-red-600' : 'text-green-600'
              }`}
              variants={childVariant}
            >
              {message}
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default AuthPage;
