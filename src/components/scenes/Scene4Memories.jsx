import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

export const Scene4Memories = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playSfx } = useSound();
  const photos = birthdayData.memories.photos;

  const handleNextCard = () => {
    playSfx('chime');
    const next = (currentIndex + 1) % photos.length;
    setCurrentIndex(next);
  };

  const handlePrevCard = () => {
    playSfx('chime');
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.6 } }}
      className="relative z-10 w-full h-full overflow-hidden flex flex-col items-center justify-center px-4 py-2 max-w-md mx-auto text-center"
    >
      {/* Section Badge Pill */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-1.5 px-4 py-1 rounded-full bg-white/80 border border-pink-300/80 text-[11px] sm:text-xs font-bold tracking-wider text-rose-800 uppercase shadow-sm backdrop-blur-sm shrink-0"
      >
        OUR MEMORIES 📸
      </motion.div>

      {/* Main Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-2xl sm:text-3xl font-extrabold text-[#4a0020] mb-1 font-serif leading-tight drop-shadow-sm shrink-0"
      >
        {birthdayData.memories.headline}
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-rose-900 text-xs sm:text-sm font-medium max-w-xs sm:max-w-md mb-2 shrink-0"
      >
        {birthdayData.memories.subtext}
      </motion.p>

      {/* Physical Photo Stack Container */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[300px] sm:h-[330px] my-1 flex items-center justify-center shrink-0">
        <AnimatePresence mode="popLayout">
          {photos.map((photo, index) => {
            const relativeIndex = (index - currentIndex + photos.length) % photos.length;
            const isTop = relativeIndex === 0;

            if (relativeIndex > 2 && relativeIndex < photos.length - 1) return null;

            return (
              <motion.div
                key={photo.id}
                style={{ zIndex: photos.length - relativeIndex }}
                initial={{ scale: 0.8, y: 40, opacity: 0 }}
                animate={{
                  scale: isTop ? 1 : 1 - relativeIndex * 0.05,
                  y: relativeIndex * 12,
                  rotate: isTop ? photo.rotation : relativeIndex * 3,
                  opacity: relativeIndex > 2 ? 0 : 1,
                }}
                exit={{ x: 300, opacity: 0, rotate: 15, transition: { duration: 0.4 } }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (Math.abs(info.offset.x) > 80) {
                    handleNextCard();
                  }
                }}
                className={`absolute w-full p-3.5 sm:p-4 rounded-3xl bg-white border-2 border-pink-200 shadow-xl transition-shadow ${
                  isTop ? 'shadow-pink-300/50 cursor-grab active:cursor-grabbing' : 'pointer-events-none'
                }`}
              >
                {/* Polaroid Photo Frame */}
                <div className="relative w-full h-[180px] sm:h-[200px] rounded-2xl overflow-hidden mb-2 bg-rose-50 border border-pink-100">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                  {/* Location & Date Badges */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center text-xs text-white">
                    <span className="flex items-center gap-1 bg-rose-950/80 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-rose-400/40">
                      <MapPin className="w-3 h-3 text-rose-300" /> {photo.location}
                    </span>
                    <span className="flex items-center gap-1 bg-rose-950/80 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-rose-400/40">
                      <Calendar className="w-3 h-3 text-amber-300" /> {photo.date}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="text-left px-1">
                  <p className="text-xs sm:text-sm font-bold text-[#4a0020] font-serif line-clamp-2 leading-snug">
                    "{photo.caption}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 my-2 z-20 shrink-0">
        <button
          onClick={handlePrevCard}
          className="p-2.5 rounded-full bg-white/90 border-2 border-pink-300 text-rose-700 shadow-sm hover:bg-pink-50 transition-all cursor-pointer"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <span className="text-xs text-rose-900 font-bold tracking-wider">
          {currentIndex + 1} / {photos.length}
        </span>

        <button
          onClick={handleNextCard}
          className="p-2.5 rounded-full bg-white/90 border-2 border-pink-300 text-rose-700 shadow-sm hover:bg-pink-50 transition-all cursor-pointer"
          aria-label="Next photo"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Next Stage Button */}
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="mt-1 px-7 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-400/40 hover:shadow-rose-500/60 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 group"
      >
        <span>Read Love Letter ✉️</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
};
