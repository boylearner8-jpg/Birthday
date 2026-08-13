import React from 'react';
import { motion } from 'framer-motion';

export const GiftBoxCutout = React.memo(({ isOpening, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-52 h-56 md:w-64 md:h-68 mx-auto my-1 cursor-pointer select-none group flex flex-col items-center justify-end"
    >
      {/* Magical Ambient Glow behind the box */}
      <motion.div
        animate={
          isOpening
            ? { scale: [1, 1.3, 1.1], opacity: [0.4, 0.9, 0.6] }
            : { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-4 bottom-4 h-40 rounded-full -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244,114,182,0.8) 0%, rgba(251,113,133,0.5) 40%, rgba(253,230,138,0.2) 70%, transparent 100%)'
        }}
      />

      {/* Sparkles / Light rays bursting out when opened */}
      {isOpening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2, y: 30 }}
          animate={{ opacity: 1, scale: 1.2, y: -15 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute z-20 pointer-events-none flex flex-col items-center"
        >
          <div className="text-3xl animate-bounce">✨💖✨</div>
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-300/60 via-pink-400/50 to-rose-400/60 blur-lg" />
        </motion.div>
      )}

      {/* Gift Box Base Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-end">
        {/* Lid Cutout (Lifts off and tilts open) */}
        <motion.div
          initial={{ y: 0, rotate: 0, scale: 1 }}
          animate={
            isOpening
              ? { y: -75, rotate: -16, scale: 1.04, opacity: 0.95 }
              : { y: [0, -5, 0] }
          }
          transition={
            isOpening
              ? { duration: 1, type: 'spring', stiffness: 90 }
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute top-4 z-30 w-full flex justify-center pointer-events-none"
        >
          <img
            src="/images/gift_lid.webp"
            alt="Gift Box Lid"
            className="w-full max-w-[200px] md:max-w-[240px] object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Box Base Cutout */}
        <motion.div
          animate={isOpening ? { scale: [1, 0.98, 1.02, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full flex justify-center drop-shadow-2xl"
        >
          <img
            src="/images/gift_base.webp"
            alt="Gift Box Base"
            className="w-full max-w-[200px] md:max-w-[240px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
          />
        </motion.div>
      </div>
    </div>
  );
});
