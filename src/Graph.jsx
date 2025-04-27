import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

function Graph({ graphData }) {
  if (!graphData) return null;

  return (
    <motion.div 
      className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-lg font-bold mb-4 text-center text-indigo-700">
        Generated Graph 📈
      </h2>
      <Line data={graphData} />
    </motion.div>
  );
}

export default Graph;
