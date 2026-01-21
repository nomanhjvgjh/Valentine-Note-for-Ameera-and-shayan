
import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { MomentCard } from '../types';

interface MomentsProps {
  onNext: () => void;
}

const Moments: React.FC<MomentsProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center">
      <div className="text-center mb-20">
        <span className="text-primary font-hand text-2xl block mb-2">{CONTENT.cards.subheading}</span>
        <h2 className="text-4xl md:text-6xl font-display text-primary">{CONTENT.cards.heading}</h2>
        <p className="mt-4 text-gray-500 font-medium italic">{CONTENT.cards.instruction}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-12 max-w-6xl w-full mb-16 px-4">
        {CONTENT.cards.items.map((card: MomentCard, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, rotate: card.rotation }}
            animate={{ opacity: 1, scale: 1, rotate: card.rotation }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0, 
              zIndex: 50, 
              y: -25,
              boxShadow: '0 25px 50px -12px rgba(255, 107, 157, 0.25)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`bg-white p-4 pb-12 rounded-sm border border-gray-100 ${card.position} w-64 md:w-72 cursor-pointer group`}
            style={{ 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div className="relative aspect-[4/5] bg-gray-200 mb-6 overflow-hidden">
              <motion.img 
                src={card.image} 
                alt="moment" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-lg">✨</span>
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            
            <div className="text-center">
              <p className="font-hand text-2xl text-gray-800 mb-2 transition-colors group-hover:text-primary">
                {card.caption}
              </p>
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -8, scale: 1.2 }}
                className="inline-block"
              >
                <span className="text-4xl block">{card.emoji}</span>
              </motion.div>
            </div>
            
            {/* Tape decorations */}
            <motion.div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-retro-pink/40 -rotate-2 opacity-50 pointer-events-none"
              whileHover={{ scaleX: 1.1, opacity: 0.7 }}
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-10 py-4 bg-primary text-white rounded-full font-bold shadow-retro flex items-center gap-2 text-xl"
      >
        {CONTENT.cards.continueButton}
        <span className="material-icons-round">arrow_forward</span>
      </motion.button>
    </div>
  );
};

export default Moments;
