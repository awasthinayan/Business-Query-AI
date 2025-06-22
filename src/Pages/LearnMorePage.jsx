import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function LearnMorePage() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-r from-green-400 to-red-300 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="bg-blend-screen p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto text-center space-y-8 bg-gradient-to-l from-orange-300 to-green-300"
      >
        <h1 className="text-5xl font-bold text-blue-700 mb-4 bg-gradient-to-l">
          About Our Technology 🚀
        </h1>

        <img 
          src="https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/12/07074817/AI-in-business-management.png" 
          alt="Business Growth"
          className="w-70 h-70 mx-auto object-contain rounded-lg shadow-lg"
        />

        <motion.p 
          className="text-xl text-gray-700 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our Business Strategy Assistant leverages advanced Artificial Intelligence (AI) 
          and cutting-edge data analytics to empower entrepreneurs, startups, and enterprises 
          with smart, actionable insights. By analyzing market trends, customer behavior, 
          and operational metrics, our platform helps businesses identify growth opportunities, 
          minimize risks, and optimize performance like never before. Whether you are looking 
          to expand into new markets, launch innovative products, or streamline your operations, 
          our intelligent assistant provides tailored strategies that are both efficient and impactful.
        </motion.p>

        <img 
          src="https://coamplifi.com/wp-content/uploads/2022/06/coamplifi_artificalintelligence-750x550.jpg" 
          alt="AI Assistant"
          className="w-70 h-70 mx-auto object-contain rounded-lg shadow-lg"
        />

        <motion.p 
          className="text-md text-gray-600 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Our AI assistant not only generates recommendations based on your input, 
          but also adapts continuously through machine learning, ensuring your business stays 
          ahead of the curve. From financial forecasting and competitive analysis to marketing 
          planning and customer engagement strategies, we cover every critical area of business 
          decision-making. With an easy-to-use interface and real-time updates, our tool acts 
          like your personal business advisor, available 24/7 to guide you towards success 
          with data-backed confidence.
        </motion.p>

        <img 
          src="https://d17ocfn2f5o4rl.cloudfront.net/wp-content/uploads/2024/07/AI-Decision-Making-Preview.jpg" 
          alt="Future Innovation"
          className="w-70 h-70 mx-auto object-contain rounded-lg shadow-lg"
        />

        <motion.p 
          className="text-md text-gray-600 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Innovation is at the heart of everything we do. Our mission is to democratize 
          access to powerful business tools so that anyone, regardless of size or resources, 
          can make smarter choices and grow sustainably. Explore how our Business Strategy 
          Assistant can be your key to unlocking new potential, reaching higher goals, 
          and navigating today's competitive markets with ease and precision. 
          Step into the future of intelligent business management today!
        </motion.p>

        <Link to="/" className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-semibold">
          ← Back to Home
        </Link>

      </motion.div>
    </motion.div>
  );
}

export default LearnMorePage;
