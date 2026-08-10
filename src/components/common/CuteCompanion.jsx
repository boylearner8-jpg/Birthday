import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const sceneDialogues = {
  0: "Shhh... enter the secret passcode! 🔐💕",
  1: "Touch the gift box to unwrap your surprise! 🎁✨",
  2: "Tap each secret box to unwrap them all! 💖",
  3: "Make a wish, my love! Blow out the candles 🎂✨",
  4: "Swipe through our favorite memory photos! 📸💕",
  5: "I saved the best for last... Open My Heart! 💌",
  6: "That was the last surprise... but my love isn't! 🥹💕",
};

export const CuteCompanion = ({ activeScene = 0 }) => {
  const [hearts, setHearts] = useState([]);
  const [showSpeech, setShowSpeech] = useState(true);
  const { playSfx } = useSound();

  const currentDialogue = sceneDialogues[activeScene] || "Happy Birthday, my love! ❤️";

  // Re-trigger speech bubble bounce when scene changes
  useEffect(() => {
    setShowSpeech(true);
  }, [activeScene]);

  const handleTapAvatar = () => {
    playSfx('chime');
    setShowSpeech(true);

    // Spawn mini floating heart burst
    const newHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 30,
    };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  const isScene3 = activeScene === 3;

  return (
    <div
      className={`fixed z-30 flex flex-col items-start pointer-events-none select-none transition-all duration-300 ${
        isScene3 ? 'bottom-2 left-2 sm:bottom-3 sm:left-3' : 'bottom-4 left-3 sm:left-5'
      }`}
    >
      {/* Dynamic Floating Speech Bubble */}
      <AnimatePresence mode="wait">
        {showSpeech && (
          <motion.div
            key={`speech-${activeScene}`}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35 }}
            onClick={handleTapAvatar}
            className={`mb-1.5 rounded-2xl bg-white/95 border-2 border-pink-200 font-semibold text-rose-950 shadow-md shadow-pink-300/20 backdrop-blur-md relative cursor-pointer ${
              isScene3
                ? 'max-w-[115px] sm:max-w-[140px] px-2.5 py-1.5 text-[10px] sm:text-[11px]'
                : 'max-w-[145px] sm:max-w-[185px] px-3.5 py-2 text-[11px] sm:text-xs'
            }`}
          >
            <p className="leading-snug">
              {currentDialogue}
            </p>
            {/* Pointer arrow pointing down toward avatar */}
            <div className="absolute -bottom-1.5 left-3.5 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-pink-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chibi Character Container */}
      <div className="relative pointer-events-auto cursor-pointer" onClick={handleTapAvatar}>
        {/* Floating Hearts Animation */}
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, x: h.x, scale: 0.8 }}
            animate={{ opacity: 0, y: -50, scale: 1.3 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute -top-3 left-1/2 text-rose-500 pointer-events-none"
          >
            <Heart className="w-4 h-4 fill-rose-500" />
          </motion.div>
        ))}

        {/* Cute Avatar Cutout (Bottom-Left) */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.06, rotate: 2 }}
          whileTap={{ scale: 0.94 }}
          className={`relative flex items-center justify-center filter drop-shadow-[0_5px_10px_rgba(244,63,94,0.2)] ${
            isScene3 ? 'w-[50px] sm:w-[60px]' : 'w-[64px] sm:w-[76px]'
          }`}
        >
          <img
            src="/images/cute_avatar.png"
            alt="Chibi Companion"
            className="w-full h-auto object-contain select-none pointer-events-none"
            draggable="false"
          />
        </motion.div>
      </div>
    </div>
  );
};
