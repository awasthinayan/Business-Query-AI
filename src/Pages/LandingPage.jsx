import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 1,
      }
    },
    exit: { opacity: 0, transition: { ease: 'easeInOut' } }
  };

  const headingVariants = {
    hidden: { scale: 0, rotate: -90, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 120, damping: 10 }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: "easeOut", delay: 0.5 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.7 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-400 to-purple-600 p-8 overflow-hidden relative"
    >
      {/* Background Glow Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-white/0 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.h1 
        className="text-5xl md:text-6xl font-bold text-white text-center mb-6 relative z-10"
        variants={headingVariants}
      >
        Welcome to Smart Business Assistant 🚀
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl text-white mb-8 text-center max-w-2xl relative z-10"
        variants={paragraphVariants}
      >
        Ask your business questions, get AI-powered insights, and visualize your strategies in graphs!
      </motion.p>

      <motion.div 
        className="flex gap-6 relative z-10"
        variants={buttonVariants}
      >
        <Link to="/dashboard">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-700 font-bold py-3 px-6 rounded-full hover:bg-purple-100 transition text-lg hover cursor-pointer"
          >
            Get Started
          </motion.button>
        </Link>

        <Link to="/learn-more">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-purple-600 transition font-semibold hover cursor-pointer"
          >
            Learn More
          </motion.button>
        </Link>
      </motion.div>

      <motion.div 
        id="learn-more" 
        className="mt-20 text-white text-center max-w-3xl relative z-10"
        variants={paragraphVariants}
      >
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-lg">
          We help you make smart decisions by using the power of AI, beautiful graphs, and strategic business insights.
          Stay ahead in the market, plan better, and grow smarter with our help!
        </p>
      </motion.div>
    </motion.div>
  );
}

export default LandingPage;
