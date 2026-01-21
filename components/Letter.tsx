
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../constants';

interface LetterProps {
  onNext: () => void;
}

const Letter: React.FC<LetterProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const openLetter = () => {
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 800);
  };

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <span className="text-primary font-hand text-2xl block mb-2">{CONTENT.letter.headerSubtitle}</span>
        <h2 className="text-4xl md:text-6xl font-display text-primary">{CONTENT.letter.headerTitle}</h2>
      </div>

      <div className="relative w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!showContent ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, y: -50 }}
              className="flex flex-col items-center"
            >
              <div 
                onClick={openLetter}
                className={`relative w-80 h-56 cursor-pointer transition-all duration-700 ${isOpen ? 'scale-110' : 'hover:scale-105'}`}
              >
                {/* Envelope Base */}
                <div className="absolute inset-0 bg-pink-200 rounded-lg shadow-xl border-2 border-primary/20" />
                
                {/* Envelope Flap */}
                <motion.div 
                  animate={{ rotateX: isOpen ? -180 : 0 }}
                  className="absolute top-0 left-0 right-0 h-28 bg-pink-300 origin-top z-20 shadow-md"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                
                {!isOpen && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                      💌
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-8 text-gray-600 font-medium">{CONTENT.letter.envelopeClickHint}</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-retro border-2 border-primary/10 relative"
            >
              <div className="absolute top-4 right-8 text-6xl opacity-10 font-display text-primary pointer-events-none">💝</div>
              
              <div className="border-b border-primary/10 pb-4 mb-8 flex justify-between items-end">
                <h3 className="text-3xl font-hand text-primary font-bold">{CONTENT.letter.letterHeaderTitle}</h3>
                <span className="text-gray-400 font-mono text-sm">Feb 14, 2025</span>
              </div>

              <div className="font-handwriting text-xl md:text-2xl leading-relaxed text-gray-800 whitespace-pre-wrap">
                {CONTENT.letter.letterMessage}
              </div>

              <div className="mt-12 text-right">
                <p className="font-hand text-3xl text-primary font-bold">{CONTENT.letter.letterSignature}</p>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={onNext}
                  className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-retro hover:bg-primary-hover transition-all flex items-center gap-2"
                >
                  {CONTENT.letter.continueButton}
                  <span className="material-icons-round">arrow_forward</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Letter;
