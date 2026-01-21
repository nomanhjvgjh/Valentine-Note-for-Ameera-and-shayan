
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../constants';
import { Track } from '../types';

interface ChillZoneProps {
  onNext: () => void;
}

const ChillZone: React.FC<ChillZoneProps> = ({ onNext }) => {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTrackClick = (trackId: number) => {
    if (activeTrack === trackId) {
      togglePlay();
    } else {
      setActiveTrack(trackId);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (activeTrack && audioRef.current) {
      const track = CONTENT.chillZone.tracks.find(t => t.id === activeTrack);
      if (track) {
        audioRef.current.src = track.src;
        audioRef.current.play().catch(e => {
          console.error("Playback failed:", e);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  }, [activeTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
      setDuration(total);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTrackData = CONTENT.chillZone.tracks.find(t => t.id === activeTrack);

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center">
      {/* Audio element for music playback */}
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
      />

      <div className="text-center mb-12">
        <span className="text-primary font-hand text-2xl block mb-2">{CONTENT.chillZone.subheading}</span>
        <h2 className="text-4xl md:text-6xl font-display text-primary">{CONTENT.chillZone.heading}</h2>
        <p className="mt-4 text-gray-500 font-medium">{CONTENT.chillZone.chooseTrackHint}</p>
      </div>

      {/* Music Player Dashboard */}
      <div className="w-full max-w-4xl mb-12">
        <AnimatePresence mode="wait">
          {activeTrack && currentTrackData ? (
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border-2 border-primary/10 flex flex-col md:flex-row items-center gap-8"
            >
              <div className="w-48 h-48 bg-pink-100 rounded-2xl flex items-center justify-center text-6xl shadow-inner relative overflow-hidden group">
                <span className="z-10 animate-pulse">🎵</span>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={togglePlay} className="text-white text-5xl">
                    <span className="material-icons-round">{isPlaying ? 'pause' : 'play_arrow'}</span>
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="mb-4 text-center md:text-left">
                  <h3 className="text-2xl font-display text-primary">{currentTrackData.title}</h3>
                  <p className="text-gray-500 font-medium">{currentTrackData.caption}</p>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-400 font-mono">
                    <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-retro hover:bg-primary-hover transition-all"
                  >
                    <span className="material-icons-round text-4xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/40 border-2 border-dashed border-primary/20 rounded-[2rem] p-12 text-center text-gray-400 font-medium">
               Select a track below to start the vibe...
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {CONTENT.chillZone.tracks.map((track) => (
          <motion.div
            key={track.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTrackClick(track.id)}
            className={`p-6 rounded-2xl cursor-pointer transition-all border-2 flex items-center gap-4 ${
              activeTrack === track.id 
                ? 'bg-primary text-white border-primary shadow-retro' 
                : 'bg-white text-gray-700 border-primary/10 hover:border-primary/30'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${activeTrack === track.id ? 'bg-white/20' : 'bg-pink-50'}`}>
              {activeTrack === track.id && isPlaying ? '💿' : '🎵'}
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">{track.title}</p>
              <p className={`text-sm ${activeTrack === track.id ? 'text-white/80' : 'text-gray-400'}`}>{track.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onNext}
        className="mt-16 px-10 py-4 bg-primary text-white rounded-full font-bold shadow-retro flex items-center gap-2 text-xl"
      >
        {CONTENT.chillZone.continueButton}
        <span className="material-icons-round">arrow_forward</span>
      </motion.button>
    </div>
  );
};

// Added missing default export to fix error in App.tsx
export default ChillZone;
