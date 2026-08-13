import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

export const Scene5LoveLetter = ({ onNext, setCustomDialogue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSfx } = useSound();

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    playSfx('letterOpen');
    setIsOpen(true);
    if (setCustomDialogue) {
      setCustomDialogue("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="relative z-10 w-full h-full max-h-full overflow-hidden flex flex-col items-center justify-start pt-5 sm:pt-9 px-3"
    >
      {/* ═══════════════════════════════════════════════════════
          GROUP 1 — Badge · Headline · Subtitle · Heart Divider
          ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col items-center w-full shrink-0">
        {/* Badge Pill */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-pink-300/80 text-[10px] sm:text-xs font-bold tracking-wider text-rose-800 uppercase shadow-sm mb-3.5 sm:mb-4.5"
          style={{ background: 'rgba(255, 255, 255, 0.78)' }}
        >
          FROM MY SOUL TO YOURS 💌
        </motion.div>

        {/* Main Title with Styled Wrap and Side Hearts */}
        <div className="relative flex items-center justify-center my-0.5">
          {/* Left Decorative Heart */}
          <motion.span
            animate={{ scale: [0.9, 1.15, 0.9], rotate: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="absolute -left-6 sm:-left-8 top-1 text-pink-500 text-lg sm:text-xl select-none"
          >
            🩷
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="font-serif font-extrabold text-center leading-tight tracking-tight px-1"
            style={{ fontSize: 'clamp(32px, 8.8vw, 44px)' }}
          >
            <span className="text-[#4a0020] block">There's one</span>
            <span className="text-[#f43f5e] font-serif block -mt-1">more thing...</span>
          </motion.h1>

          {/* Right Decorative Heart */}
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [6, -6, 6] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.3 }}
            className="absolute -right-6 sm:-right-8 bottom-1 text-pink-500 text-lg sm:text-xl select-none"
          >
            💕
          </motion.span>
        </div>

        {/* Heart Divider ───── ♥ ───── */}
        <div className="flex items-center justify-center gap-2.5 w-32 sm:w-40 mt-0.5 mb-1 shrink-0">
          <div className="flex-1 h-[1px] bg-pink-300/60" />
          <span className="text-xs text-rose-400 select-none">♥</span>
          <div className="flex-1 h-[1px] bg-pink-300/60" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          GROUP 2 — Main Open My Heart Card (Closed vs Open)
          ═══════════════════════════════════════════════════════ */}
      <div className="relative w-full flex items-center justify-center shrink-0">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Card View */
            <motion.div
              key="closed-heart-card"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0, y: 15 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenEnvelope}
              className="w-[84vw] max-w-[340px] h-[350px] sm:h-[380px] rounded-[32px] bg-gradient-to-b from-white/95 via-pink-50/90 to-rose-50/95 border-2 border-pink-200/90 p-5 flex flex-col items-center justify-between text-center cursor-pointer shadow-[0_14px_40px_rgba(244,63,94,0.22)] relative overflow-hidden shrink-0 group"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/20 via-rose-200/15 to-amber-100/20 rounded-[32px] blur-xl -z-10 group-hover:opacity-100 transition-opacity opacity-75" />

              {/* Gold Heart Seal (Pink Circle + pure Gold Heart asset) */}
              <div className="relative mt-1 flex items-center justify-center shrink-0">
                {/* Floating sparkles */}
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute -top-3 -left-4 text-amber-400 text-base select-none"
                >
                  ✨
                </motion.span>

                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute -bottom-2 -right-4 text-pink-400 text-base select-none"
                >
                  ✦
                </motion.span>

                {/* Profile Picture Circle Seal */}
                <div className="w-26 h-26 sm:w-30 sm:h-30 rounded-full bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 p-1.5 shadow-[0_6px_22px_rgba(244,63,94,0.3)] flex items-center justify-center border-2 border-white/90 overflow-hidden">
                  <img
                    src="/images/cat_pfp.webp"
                    alt="Cat Profile"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Card Title */}
              <h2
                className="font-serif font-extrabold text-[#4a0020] leading-tight flex items-center justify-center gap-1.5"
                style={{ fontSize: 'clamp(24px, 6.5vw, 30px)' }}
              >
                <span>Open My Heart!</span>
                <span>💌</span>
              </h2>

              {/* Dotted Pink Divider */}
              <div className="text-pink-300 text-xs tracking-widest my-0.5 select-none font-mono">
                ········ ♥ ········
              </div>

              {/* Instruction Subtext */}
              <p
                className="font-medium text-rose-900/90 leading-snug mb-1"
                style={{ fontSize: 'clamp(15px, 4.2vw, 18px)' }}
              >
                Tap to break the wall<br />
                & reveal the letter 💕
              </p>
            </motion.div>
          ) : (
            /* Open Unfolded Letter View */
            <motion.div
              key="open-letter-view"
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
              className="w-[84vw] max-w-[340px] rounded-[28px] bg-white/95 border-2 border-pink-200 p-5 flex flex-col text-left shadow-[0_14px_36px_rgba(244,63,94,0.22)] max-h-[56vh] overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-pink-100 shrink-0">
                <span className="text-[11px] font-bold text-rose-700 tracking-wider uppercase font-mono flex items-center gap-1">
                  <span>Letter For You</span>
                  <span>💌</span>
                </span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto no-scrollbar pr-1 space-y-2.5 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-[#4a0020] font-serif">
                  {birthdayData.loveLetter.salutation}
                </h3>

                <div className="space-y-2 text-rose-900 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  {birthdayData.loveLetter.body.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.12 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-pink-100 text-right">
                  <p className="text-xs text-rose-700 italic">
                    {birthdayData.loveLetter.closing}
                  </p>
                  <p className="text-base font-bold text-rose-600 font-cursive mt-0.5">
                    {birthdayData.senderName}
                  </p>
                </div>
              </div>

              {/* Next Scene Button */}
              <motion.button
                onClick={onNext}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-3 w-full py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-400/40 hover:shadow-rose-500/60 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>One Last Surprise... ✨</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
