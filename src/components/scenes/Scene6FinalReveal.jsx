import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

export const Scene6FinalReveal = ({ onReplay }) => {
  const { playSfx } = useSound();

  React.useEffect(() => {
    // Grand Finale Pink Confetti Burst
    playSfx('chime');
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.4 },
      colors: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#fff1f2'],
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-start pt-10 sm:pt-14 px-4 max-w-3xl mx-auto text-center overflow-hidden h-full"
    >
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-3.5 sm:mb-4 px-4 py-1 rounded-full bg-white/80 border border-pink-300/80 text-[11px] sm:text-xs font-bold tracking-wider text-rose-800 uppercase shadow-sm backdrop-blur-sm"
      >
        {birthdayData.finale.headline}
      </motion.div>

      {/* Main Finale Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl sm:text-4xl font-extrabold text-[#4a0020] font-serif mb-2.5 drop-shadow-sm"
      >
        {birthdayData.finale.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-rose-900 text-xs sm:text-sm font-medium max-w-md mb-2.5 sm:mb-3"
      >
        {birthdayData.finale.subtext}
      </motion.p>

      {/* Featured Finale Portrait Frame */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
        className="relative mt-1.5 mb-3.5 w-full max-w-xs sm:max-w-sm rounded-3xl p-2.5 bg-white border-2 border-pink-200 shadow-xl overflow-hidden group"
      >
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-rose-50 border border-pink-100">
          <img
            src={birthdayData.finale.featuredImage}
            alt="Final Birthday Surprise"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent" />

          {/* Floating glowing heart overlay */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-bounce" />
            <span className="text-white font-serif font-bold text-base sm:text-lg drop-shadow-md">
              Always & Forever
            </span>
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-bounce" />
          </div>
        </div>
      </motion.div>

      {/* Replay Surprise Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-5 sm:mt-7"
      >
        <button
          onClick={onReplay}
          className="px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-400/40 hover:shadow-rose-500/60 transition-all flex items-center gap-2.5 cursor-pointer group hover:scale-105"
        >
          <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
          <span>{birthdayData.finale.replayButtonText}</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
