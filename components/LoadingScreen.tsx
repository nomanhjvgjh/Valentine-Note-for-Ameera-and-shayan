
import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-light">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mb-8"
      >
        <div className="w-48 h-48 rounded-full bg-pink-100 flex items-center justify-center shadow-xl relative overflow-hidden">
          <div className="text-8xl z-10">💌</div>
          <motion.div 
            animate={{ x: [-200, 200], y: [-20, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute text-3xl text-primary/20 pointer-events-none"
          >
            💖 💖 💖
          </motion.div>
        </div>
      </motion.div>

      <h2 className="text-3xl font-display text-primary mb-2 text-center px-4">
        {CONTENT.loading.title}
      </h2>
      <p className="text-gray-500 font-hand text-xl italic">
        {CONTENT.loading.subtitle}
      </p>

      <div className="mt-12 w-64 h-2 bg-pink-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
