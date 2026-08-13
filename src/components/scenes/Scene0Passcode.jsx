import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Lock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

export const Scene0Passcode = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { playSfx, unlockAudio } = useSound();
  const timeoutRefs = useRef([]);

  const targetCode = birthdayData.passcode.code || '1234';

  const handleKeyPress = (digit) => {
    if (isSuccess || pin.length >= 4) return;
    unlockAudio();
    playSfx('chime');

    const newPin = pin + digit;
    setPin(newPin);
    setIsError(false);

    if (newPin.length === 4) {
      verifyPasscode(newPin);
    }
  };

  const handleDelete = () => {
    if (isSuccess || pin.length === 0) return;
    playSfx('chime');
    setPin((prev) => prev.slice(0, -1));
    setIsError(false);
  };

  const verifyPasscode = (codeToTest) => {
    if (codeToTest === targetCode) {
      setIsSuccess(true);
      playSfx('giftOpen');

      confetti({
        particleCount: 80,
        spread: 110,
        origin: { y: 0.5 },
        colors: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#ffffff'],
      });

      const id = setTimeout(() => {
        onUnlock();
      }, 1200);
      timeoutRefs.current.push(id);
    } else {
      setIsError(true);
      playSfx('candleBlow');

      if (navigator.vibrate) navigator.vibrate(200);

      const id2 = setTimeout(() => {
        setPin('');
        setIsError(false);
      }, 300);
      timeoutRefs.current.push(id2);
    }
  };

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-10 overflow-hidden"
    >
      {/* Full-screen background image */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/login_bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle warm overlay */}
      <div className="fixed inset-0 bg-rose-950/5 pointer-events-none" />

      {/* Content: Shifted slightly above center */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-h-full px-3 -mt-4 sm:-mt-6 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md mx-auto scale-[0.9] sm:scale-95 md:scale-100"
        >

          {/* ── TOP: Dark Red Polaroid Frame (Slightly Smaller) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative w-full max-w-[220px] sm:max-w-[250px] bg-[#4a0a14] p-3 sm:p-3.5 pb-4 rounded-2xl shadow-2xl border-4 border-[#3b070f] text-white flex flex-col items-center shrink-0"
          >
            {/* Pink flower pin top-left */}
            <div className="absolute -top-4 -left-4 z-20 w-9 h-9 sm:w-11 sm:h-11 drop-shadow-md">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-pink-300 stroke-rose-400 stroke-2">
                <path d="M50 15 C35 0, 15 20, 35 35 C15 35, 0 55, 20 70 C20 85, 40 100, 50 80 C60 100, 80 85, 80 70 C100 55, 85 35, 65 35 C85 20, 65 0, 50 15 Z" />
                <circle cx="50" cy="50" r="10" className="fill-amber-300" />
              </svg>
            </div>

            {/* Photo inside */}
            <div className="relative w-full h-36 sm:h-44 bg-rose-900/40 rounded-xl overflow-hidden mb-1.5 border-2 border-red-900/60 shadow-inner">
              <img
                src={birthdayData.passcode.coupleImage}
                alt="Couple Polaroid"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Cursive note */}
            <div className="w-full flex justify-between items-center px-1.5 pt-0.5">
              <span className="font-cursive text-white text-base sm:text-lg font-bold">With Love 💕</span>
              <span className="text-xs">🌸</span>
            </div>

            {/* Ribbon tape bottom-right */}
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-[#3a060d] rotate-[-10deg] shadow-md flex items-center justify-center text-[8px] sm:text-[9px] text-white font-mono tracking-wider uppercase border border-red-950 rounded-sm">
              FOREVER
            </div>
          </motion.div>

          {/* ── MIDDLE: Creamy Soft Pink Passcode Card Window ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center w-full max-w-[260px] sm:max-w-[295px] bg-[#fff6f6]/95 sm:bg-white/95 p-3.5 sm:p-4.5 rounded-3xl border-2 border-pink-200 shadow-xl text-rose-950 shrink-0 mt-2 sm:mt-4"
          >
            {/* Bow decoration */}
            <div className="text-xl sm:text-2xl mb-0.5 select-none">🎀</div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-rose-950 mb-0.5 font-serif tracking-wide">
              {birthdayData.passcode.title}
            </h2>
            <p className="text-rose-700 text-xs font-medium mb-3 sm:mb-4">
              {birthdayData.passcode.hint}
            </p>

            {/* 4 Digit Slot Boxes */}
            <motion.div
              animate={isError ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex justify-center gap-2.5 mb-4 sm:mb-5"
            >
              {[0, 1, 2, 3].map((index) => {
                const hasDigit = pin.length > index;
                return (
                  <div
                    key={index}
                    className={`w-10 h-12 sm:w-11 sm:h-13 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                      isSuccess
                        ? 'border-emerald-500 bg-emerald-100 text-emerald-800 shadow-md'
                        : isError
                        ? 'border-rose-500 bg-rose-100 text-rose-800 shadow-md'
                        : hasDigit
                        ? 'border-pink-400 bg-rose-100 text-rose-950 shadow-md scale-105'
                        : 'border-pink-300 bg-white text-rose-900'
                    }`}
                  >
                    {hasDigit ? (isSuccess ? <Check className="w-5 h-5 text-emerald-600" /> : '🍓') : ''}
                  </div>
                );
              })}
            </motion.div>

            {/* Error Feedback */}
            <AnimatePresence>
              {isError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-800 font-semibold mb-2 bg-rose-100 px-3 py-1 rounded-full border border-rose-300"
                >
                  Oopsie! Wrong code 🤫
                </motion.p>
              )}
            </AnimatePresence>

            {/* 3x4 Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-[210px] sm:max-w-[240px]">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleKeyPress(num)}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-rose-950 font-bold text-xl shadow-md hover:bg-pink-50 transition-all flex items-center justify-center cursor-pointer border border-pink-200 mx-auto"
                >
                  {num}
                </motion.button>
              ))}

              {/* Delete button (Pink) */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                onClick={handleDelete}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-pink-400 text-white font-bold shadow-md hover:bg-pink-500 transition-all flex items-center justify-center cursor-pointer border border-pink-300 mx-auto"
                aria-label="Delete digit"
              >
                <Delete className="w-4.5 h-4.5 text-white" />
              </motion.button>

              {/* Zero button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => handleKeyPress('0')}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-rose-950 font-bold text-xl shadow-md hover:bg-pink-50 transition-all flex items-center justify-center cursor-pointer border border-pink-200 mx-auto"
              >
                0
              </motion.button>

              {/* Lock icon button (Pink) */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-pink-400 text-white shadow-md flex items-center justify-center border border-pink-300 mx-auto">
                <Lock className="w-4.5 h-4.5 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
