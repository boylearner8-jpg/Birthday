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

const cardAccents = {
  1: 'from-pink-400 via-rose-400 to-pink-500',
  2: 'from-rose-400 via-pink-500 to-rose-600',
  3: 'from-pink-500 via-rose-400 to-amber-400',
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.5 } }}
      className="relative z-10 w-full h-full max-h-full overflow-hidden flex flex-col items-center justify-start pt-6 sm:pt-10 px-3"
    >
      {/* ═══════════════════════════════════════════════════════
          GROUP 1 — Header (Badge · Title · Subtext)
          ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col items-center w-full shrink-0 mb-4 sm:mb-6">
        {/* Badge Pill */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-pink-300/80 text-[10px] sm:text-xs font-bold tracking-wider text-rose-800 uppercase shadow-sm backdrop-blur-sm mb-3.5 sm:mb-4.5"
          style={{ background: 'rgba(255, 255, 255, 0.78)' }}
        >
          SURPRISE LEVEL 02 ✨
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-2xl sm:text-3xl font-serif font-extrabold text-[#4a0020] text-center leading-tight mb-1 drop-shadow-sm"
        >
          Wait... there's more. ✨
        </motion.h2>

        {/* Instruction Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          className="text-rose-900/90 text-xs sm:text-sm font-medium max-w-xs sm:max-w-md text-center leading-relaxed"
        >
          Tap and unwrap each mystery box below to reveal secret messages & birthday vouchers!
        </motion.p>
      </div>

      {/* ═══════════════════════════════════════════════════════
          GROUP 2 — 3 Elegant Gift Cards (Stacking Vertically)
          ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-3 w-full max-w-[340px] items-center shrink-0">
        {birthdayData.gifts.map((gift, index) => {
          const IconComponent = iconMap[gift.iconName] || Gift;
          const isOpened = openedGifts.includes(gift.id);
          const gradientAccent = cardAccents[gift.id] || 'from-pink-400 to-rose-500';

          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.12 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleGiftClick(gift)}
              className={`w-full p-3.5 sm:p-4 rounded-[24px] bg-gradient-to-b from-white/95 via-pink-50/90 to-rose-50/95 border-2 text-left cursor-pointer transition-all duration-300 flex items-center gap-3.5 relative overflow-hidden backdrop-blur-md group ${
                isOpened
                  ? 'border-pink-300 shadow-[0_4px_16px_rgba(244,63,94,0.12)]'
                  : 'border-pink-200/90 shadow-[0_8px_24px_rgba(244,63,94,0.16)] hover:border-pink-300'
              }`}
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-transparent to-rose-200/20 rounded-[24px] blur-md -z-10 group-hover:opacity-100 transition-opacity opacity-60" />

              {/* Gift Icon Seal Badge */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${gradientAccent} p-3 shadow-md shadow-pink-400/25 flex items-center justify-center border-2 border-white/90 group-hover:scale-105 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white filter drop-shadow-sm" />
                </div>
              </div>

              {/* Card Title & Content */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-pink-100/90 text-rose-800 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-pink-200">
                    {gift.boxTitle}
                  </span>

                  {isOpened && (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Opened</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-[#4a0020] text-sm sm:text-base leading-snug truncate">
                  {gift.badge}
                </h3>

                <p className="text-[11px] sm:text-xs font-medium text-rose-800/80 truncate">
                  {isOpened ? "Tap to view again ✨" : gift.previewText}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════
          GROUP 3 — Action Button ("Continue To Birthday Moment 🎂")
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-8 sm:mt-10 shrink-0"
      >
        <button
          onClick={onNext}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-400/40 hover:shadow-rose-500/60 transition-all flex items-center gap-2 cursor-pointer group hover:scale-105"
        >
          <span>Continue To Birthday Moment 🎂</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          Modal View for Opened Gift Content
          ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeModalGift && (() => {
          const currentIndex = birthdayData.gifts.findIndex((g) => g.id === activeModalGift.id);
          const nextGift = birthdayData.gifts[currentIndex + 1];

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.88, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-[32px] bg-white/98 border-2 border-pink-200 p-6 text-left shadow-[0_16px_48px_rgba(244,63,94,0.25)] overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-pink-100 text-rose-800 hover:bg-pink-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-rose-800 border border-pink-200 mb-2 inline-block">
                  {activeModalGift.badge}
                </span>

                <h3 className="text-xl font-bold font-serif text-[#4a0020] mb-2 leading-snug">
                  {activeModalGift.title}
                </h3>

                <p className="text-rose-900 text-xs sm:text-sm leading-relaxed mb-5 font-sans font-medium">
                  {activeModalGift.content}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-pink-100">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-full bg-pink-100/80 text-rose-800 font-bold text-xs hover:bg-pink-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  {nextGift ? (
                    <button
                      onClick={() => handleGiftClick(nextGift)}
                      className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next Secret →</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleCloseModal();
                        onNext();
                      }}
                      className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next Surprise →</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
};
