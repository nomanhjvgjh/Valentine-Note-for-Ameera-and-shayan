
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { MemoryCard } from '../types';

interface MemoryGameProps {
  onNext: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onNext }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initGame = () => {
    const pairs = CONTENT.memoryGame.pairs;
    const shuffled = [...pairs, ...pairs]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) setGameWon(true);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <span className="text-primary font-hand text-2xl block mb-2">{CONTENT.memoryGame.subheading}</span>
        <h2 className="text-4xl md:text-6xl font-display text-primary">{CONTENT.memoryGame.heading}</h2>
        <p className="mt-4 text-gray-500 font-medium">{CONTENT.memoryGame.instruction}</p>
      </div>

      <div className="flex gap-8 mb-8 text-xl font-bold text-primary">
        <div className="bg-white px-6 py-2 rounded-full shadow-retro">Moves: {moves}</div>
        <div className="bg-white px-6 py-2 rounded-full shadow-retro">Matches: {matched.length / 2} / {CONTENT.memoryGame.pairs.length}</div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl w-full">
        {cards.map((card) => {
          const isCardFlipped = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className="aspect-square relative cursor-pointer"
              style={{ perspective: 1000 }}
            >
              <motion.div
                animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 bg-primary rounded-xl flex items-center justify-center text-4xl shadow-lg border-4 border-white/20"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-white font-bold">?</span>
                </div>
                {/* Back */}
                <div 
                  className={`absolute inset-0 bg-white rounded-xl flex items-center justify-center text-4xl shadow-lg border-4 ${matched.includes(card.id) ? 'border-retro-green opacity-80' : 'border-primary'}`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {card.emoji}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {gameWon && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-12 text-center">
          <h3 className="text-3xl font-display text-primary mb-4">Well Done! 🎉</h3>
          <button 
            onClick={initGame}
            className="px-6 py-2 bg-retro-green text-white rounded-full font-bold shadow-retro mr-4"
          >
            Play Again
          </button>
          <button 
            onClick={onNext}
            className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow-retro"
          >
            {CONTENT.memoryGame.continueButton}
          </button>
        </motion.div>
      )}

      {!gameWon && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onNext}
          className="mt-12 px-10 py-3 bg-primary text-white rounded-full font-bold shadow-retro flex items-center gap-2"
        >
          {CONTENT.memoryGame.continueButton}
          <span className="material-icons-round">arrow_forward</span>
        </motion.button>
      )}
    </div>
  );
};

export default MemoryGame;
