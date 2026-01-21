
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../constants';

interface NavigationProps {
  currentPage: number;
  onNavigate: (id: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id: number) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[60] p-4 bg-primary text-white rounded-full shadow-lg transition-transform active:scale-90"
      >
        <span className="material-icons-round">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[50]"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-[55] shadow-2xl p-12 flex flex-col"
            >
              <h2 className="text-3xl font-display text-primary mb-12">{CONTENT.navigation.heading}</h2>
              
              <div className="space-y-6 overflow-y-auto grow scrollbar-hide">
                {CONTENT.navigation.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all ${
                      currentPage === section.id 
                        ? 'bg-primary text-white shadow-retro' 
                        : 'hover:bg-pink-50 text-gray-700'
                    }`}
                  >
                    <span className="text-2xl">{section.icon}</span>
                    <span className="font-bold text-lg">{section.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 text-center">
                <p className="text-primary font-hand text-xl italic">{CONTENT.navigation.footerText}</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
