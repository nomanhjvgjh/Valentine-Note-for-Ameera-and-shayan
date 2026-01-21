
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';

interface LandingProps {
  onEnter: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  const [typedLine, setTypedLine] = useState('');
  const fullLine = CONTENT.landing.lastLine;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedLine(fullLine.slice(0, i));
      i++;
      if (i > fullLine.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullLine]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl relative z-10"
      >
        <span className="block text-primary font-hand text-2xl rotate-[-2deg] mb-4">
          {CONTENT.landing.welcome}
        </span>
        <h1 className="text-5xl md:text-7xl font-display text-primary mb-8 leading-tight drop-shadow-sm">
          {CONTENT.landing.title}
        </h1>
        
        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-retro border-2 border-primary/20">
          <div className="absolute -top-12 -right-8 w-24 h-24 pointer-events-none">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1ZHZ1eHdqNXB1eG5xc2ZqZzl0NmxrZmx2ZmdqZmx2Zmx2Zmx2Zmx2JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/vVzH2XY3Y0Ar6/giphy.gif" alt="heart" className="w-full h-full object-contain animate-float" />
          </div>
          
          <p className="text-gray-700 text-xl font-body mb-6">
            {CONTENT.landing.subtitle}
          </p>
          
          <div className="font-hand text-2xl mb-8 text-primary h-8">
            {typedLine}
            <span className="inline-block w-1 h-6 bg-primary ml-1 animate-pulse" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="px-10 py-4 bg-primary text-white rounded-full font-bold text-xl shadow-retro hover:bg-primary-hover transition-all flex items-center gap-2 mx-auto"
          >
            {CONTENT.landing.button}
            <span className="material-icons-round">arrow_forward</span>
          </motion.button>
        </div>
      </motion.div>
      
      <footer className="mt-16 text-gray-500 font-hand text-lg">
        {CONTENT.landing.footer}
      </footer>
    </div>
  );
};

export default Landing;
