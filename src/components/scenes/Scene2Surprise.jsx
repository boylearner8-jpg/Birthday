import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

const iconMap = {
  Heart: Heart,
  Sparkles: Sparkles,
  Gift: Gift,
};

export const Scene2Surprise = ({ onNext }) => {
  const [openedGifts, setOpenedGifts] = useState([]);
  const [activeModalGift, setActiveModalGift] = useState(null);
  const { playSfx } = useSound();

  const handleGiftClick = (gift) => {
    playSfx('giftOpen');
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts((prev) => [...prev, gift.id]);
    }
    setActiveModalGift(gift);
  };

  const handleCloseModal = () => {
    setActiveModalGift(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -20, transition: { duration: 0.5 } }}
      className="relative z-10 flex flex-col items-center justify-center h-full max-h-full px-4 py-2 max-w-4xl mx-auto text-center overflow-hidden"
    >
      {/* Scene Header */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-rose-900 font-bold text-xs md:text-sm tracking-widest uppercase mb-1"
      >
        Surprise Level 02 ✨
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-5xl font-extrabold text-rose-950 mb-1 font-serif drop-shadow-sm"
      >
        Wait... there's more. ✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-rose-900 text-xs md:text-base font-medium max-w-md mb-4 md:mb-8"
      >
        Tap and unwrap each mystery box below to reveal secret messages & birthday vouchers!
      </motion.p>

      {/* Interactive 3 Gift Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 w-full mb-4 md:mb-8">
        {birthdayData.gifts.map((gift, index) => {
          const IconComponent = iconMap[gift.iconName] || Gift;
          const isOpened = openedGifts.includes(gift.id);

          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleGiftClick(gift)}
              className={`relative cursor-pointer rounded-2xl md:rounded-3xl p-3 md:p-6 bg-white border-2 md:border-3 ${
                isOpened
                  ? 'border-rose-400 bg-rose-50/90 shadow-md'
                  : 'border-pink-200 hover:border-rose-400 shadow-xl'
              } transition-all duration-300 group flex flex-row sm:flex-col items-center justify-between sm:justify-between min-h-[70px] sm:min-h-[200px]`}
            >
              {/* Top status indicator */}
              <div className="w-full flex justify-between items-center text-[10px] md:text-xs">
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-pink-100 text-rose-800 font-bold border border-pink-300">
                  {gift.boxTitle}
                </span>
                {isOpened && (
                  <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] md:text-xs">
                    <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" /> Opened
                  </span>
                )}
              </div>

              {/* Floating Gift Box Icon Graphic */}
              <div className="my-1 sm:my-3 relative">
                <div
                  className={`w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gift.accentColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 animate-float`}
                >
                  <IconComponent className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-md" />
                </div>
              </div>

              <div className="text-left sm:text-center">
                <h3 className="font-bold text-rose-950 text-xs sm:text-sm md:text-base mb-0.5">
                  {gift.badge}
                </h3>
                <p className="text-[10px] md:text-xs text-rose-700 line-clamp-1 sm:line-clamp-2">
                  {isOpened ? "Tap to view again ✨" : gift.previewText}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prominent Next Stage Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-3 my-2"
      >
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-sm md:text-base shadow-lg shadow-rose-400/40 hover:shadow-rose-500/60 transition-all flex items-center gap-2 cursor-pointer group hover:scale-105"
        >
          <span>Continue To Birthday Moment 🎂</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Modal View for Opened Gift Content */}
      <AnimatePresence>
        {activeModalGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg p-6 md:p-8 rounded-3xl bg-white border-4 border-pink-200 text-left shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 text-rose-800 hover:bg-pink-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-rose-800 border border-pink-300 mb-3 inline-block">
                {activeModalGift.badge}
              </span>

              <h3 className="text-2xl font-bold text-rose-950 mb-3 font-serif">
                {activeModalGift.title}
              </h3>

              <p className="text-rose-900 text-base leading-relaxed mb-6 font-sans">
                {activeModalGift.content}
              </p>

              <div className="flex justify-between items-center pt-2 border-t border-pink-100">
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-full bg-pink-100 text-rose-800 font-bold text-xs hover:bg-pink-200 transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    handleCloseModal();
                    onNext();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Scene 🎂</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
