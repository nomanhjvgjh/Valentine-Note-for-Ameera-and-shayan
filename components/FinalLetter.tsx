
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';

interface FinalLetterProps {
  onRestart: () => void;
}

const FinalLetter: React.FC<FinalLetterProps> = ({ onRestart }) => {
  const [isSealed, setIsSealed] = useState(false);
  const [typedSign, setTypedSign] = useState('');

  useEffect(() => {
    if (isSealed) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedSign(CONTENT.finalLetter.typedDefault.slice(0, i));
        i++;
        if (i > CONTENT.finalLetter.typedDefault.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isSealed]);

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 rounded-3xl p-8 md:p-12 shadow-retro border-4 border-white/50"
      >
        {!isSealed ? (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                <span className="material-icons-round">mail</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-primary">{CONTENT.finalLetter.title}</h2>
            </div>

            <div className="bg-white/80 p-8 rounded-2xl font-hand text-2xl leading-loose text-gray-800 shadow-inner">
              <p className="text-primary font-bold mb-4">{CONTENT.finalLetter.letterGreeting}</p>
              {CONTENT.finalLetter.letterParagraphs.map((p, idx) => (
                <p key={idx} className="mb-4">{p}</p>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6">
              <p className="text-gray-600 italic font-medium">{CONTENT.finalLetter.sealingNote}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsSealed(true)}
                  className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-retro hover:bg-primary-hover flex items-center gap-2"
                >
                  {CONTENT.finalLetter.sealButton}
                  <span className="material-icons-round">favorite</span>
                </button>
                <button
                  onClick={onRestart}
                  className="px-6 py-3 bg-retro-green text-white rounded-full font-bold shadow-retro hover:opacity-90"
                >
                  {CONTENT.finalLetter.restartButton}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 space-y-8"
          >
            <div className="relative inline-block">
              <div className="text-8xl animate-bounce-slow">💌</div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 -right-4 text-4xl"
              >
                💖
              </motion.div>
            </div>

            <div>
              <h2 className="text-4xl font-display text-primary mb-2">{CONTENT.finalLetter.sealedTitle}</h2>
              <p className="text-xl text-gray-600">{CONTENT.finalLetter.sealedSubtitle}</p>
            </div>

            <div className="bg-white/60 p-8 rounded-2xl border-2 border-primary/20 inline-block min-w-[300px]">
              <p className="text-3xl font-hand text-primary font-bold mb-2">
                {typedSign}
                <span className="inline-block w-1 h-6 bg-primary ml-1 animate-pulse" />
              </p>
              <p className="text-gray-400 font-mono text-sm">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={onRestart}
                className="px-10 py-4 bg-primary text-white rounded-full font-bold text-xl shadow-retro flex items-center gap-2 mx-auto"
              >
                {CONTENT.finalLetter.experienceAgain}
                <span className="material-icons-round">refresh</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FinalLetter;
