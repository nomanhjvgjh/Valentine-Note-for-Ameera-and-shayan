
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from './constants';
import Landing from './components/Landing';
import Letter from './components/Letter';
import ChillZone from './components/ChillZone';
import MemoryGame from './components/MemoryGame';
import Moments from './components/Moments';
import WhySpecial from './components/WhySpecial';
import FinalLetter from './components/FinalLetter';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import PetalsEffect from './components/PetalsEffect';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const nextStep = () => {
    setCurrentPage((prev) => (prev + 1) % 7);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setLoading(true);
    setCurrentPage(0);
    setTimeout(() => setLoading(false), 3000);
  };

  const screens = [
    <Landing onEnter={nextStep} />,
    <Letter onNext={nextStep} />,
    <ChillZone onNext={nextStep} />,
    <MemoryGame onNext={nextStep} />,
    <Moments onNext={nextStep} />,
    <WhySpecial onNext={nextStep} />,
    <FinalLetter onRestart={restart} />
  ];

  return (
    <div className="relative min-h-screen font-body overflow-x-hidden selection:bg-primary selection:text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <div className="fixed inset-0 bg-background-light -z-10" />
            <PetalsEffect />
            <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full min-h-screen"
              >
                {screens[currentPage]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
