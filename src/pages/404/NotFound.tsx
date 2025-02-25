 

import { motion } from "framer-motion";

export const NotFound = () => {
  return (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
      <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
          <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
          <motion.div
            className="ml-4 text-lg uppercase tracking-wider"
            animate={{ color: ["#000000", "#FFD700", "#0000ff"] }}  
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.div>
          </div>
          <motion.div
            className="ml-4 text-lg uppercase tracking-wider"
            animate={{ color: ["#000000", "#FFD700", "#0000ff"] }}  
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Not Found
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
