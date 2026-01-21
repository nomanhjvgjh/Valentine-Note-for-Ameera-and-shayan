
import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { Reason } from '../types';

interface WhySpecialProps {
  onNext: () => void;
}

const WhySpecial: React.FC<WhySpecialProps> = ({ onNext }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center">
      <div className="text-center mb-16">
        <span className="text-primary font-hand text-2xl block mb-2">{CONTENT.whySpecial.subheading}</span>
        <h2 className="text-4xl md:text-6xl font-display text-primary">{CONTENT.whySpecial.heading}</h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {CONTENT.whySpecial.reasons.map((reason: Reason, idx: number) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border-2 border-primary/10 flex flex-col items-center text-center group transition-all hover:bg-white/90"
          >
            <div className="w-20 h-20 bg-retro-yellow rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
              {reason.emoji}
            </div>
            <h3 className="text-2xl font-display text-primary mb-3">{reason.title}</h3>
            <p className="text-gray-600 font-body text-lg leading-relaxed">{reason.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onNext}
        className="mt-16 px-10 py-4 bg-primary text-white rounded-full font-bold shadow-retro flex items-center gap-2 text-xl"
      >
        {CONTENT.whySpecial.continueButton}
        <span className="material-icons-round">arrow_forward</span>
      </motion.button>
    </div>
  );
};

export default WhySpecial;
