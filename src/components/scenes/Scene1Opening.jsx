import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GiftBoxCutout } from '../common/GiftBoxCutout';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

const GIFT_NATURAL_W = 208;

/* Ambient floating hearts in background */
const HEARTS = [
  { id: 1, sz: 14, top: '8%',  left: '-26%', delay: 0,    dur: 3.1 },
  { id: 2, sz: 11, top: '15%', left: '108%', delay: 0.75, dur: 2.8 },
  { id: 3, sz: 16, top: '55%', left: '-22%', delay: 0.35, dur: 3.5 },
  { id: 4, sz: 12, top: '62%', left: '110%', delay: 1.1,  dur: 3.0 },
  { id: 5, sz: 10, top: '-6%', left: '42%',  delay: 0.55, dur: 2.6 },
  { id: 6, sz: 13, top: '84%', left: '18%',  delay: 0.9,  dur: 3.3 },
  { id: 7, sz: 9,  top: '80%', left: '80%',  delay: 0.2,  dur: 2.9 },
];

export const Scene1Opening = ({ onComplete }) => {
  /*
   * Animation Sequence Phases:
   * 'idle' -> 'rising' -> 'displaying' -> 'glowing' -> 'dissolving' -> complete
   */
  const [animPhase, setAnimPhase] = useState('idle');
  const [giftScale, setGiftScale] = useState(1);
  const { playSfx, unlockAudio }  = useSound();
  const hasTriggered = useRef(false);
  const timerRefs = useRef([]);

  const safeTimeout = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timerRefs.current.push(id);
    return id;
  };

  useEffect(() => {
    return () => {
      timerRefs.current.forEach(clearTimeout);
    };
  }, []);

  /* Compute scale once after mount */
  useEffect(() => {
    const targetW = Math.min(Math.max(window.innerWidth * 0.72, 210), 280);
    setGiftScale(targetW / GIFT_NATURAL_W);
  }, []);

  const isCompleting = useRef(false);

  /* Instant click to skip/continue */
  const handleLetterClick = () => {
    if (isCompleting.current) return;
    isCompleting.current = true;
    setAnimPhase('dissolving');
    confetti({
      particleCount: 50,
      spread: 110,
      origin: { y: 0.4 },
      colors: ['#fecdd3', '#fda4af', '#fb7185', '#fff1f2', '#ffd700'],
    });
    safeTimeout(() => {
      onComplete();
    }, 550);
  };

  /* ── Cinematic Gift Open Sequence ── */
  const handleOpenGift = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    unlockAudio();
    playSfx('giftOpen');

    // 1. Lid opens & Letter rises directly out of gift box
    setAnimPhase('rising');

    // Initial sparkles
    confetti({
      particleCount: 45,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#fff1f2', '#ffd700'],
    });

    // 2. Letter reaches center & settles at 0.8s
    safeTimeout(() => {
      setAnimPhase('displaying');
      try { playSfx('chime'); } catch (e) {}
    }, 800);

    // 3. Soft Golden/Pink Glow at 1.8s
    safeTimeout(() => {
      setAnimPhase('glowing');
    }, 1800);

    // 4. Dissolve into glowing camera particles at 2.4s
    safeTimeout(() => {
      if (isCompleting.current) return;
      setAnimPhase('dissolving');
      confetti({
        particleCount: 50,
        spread: 110,
        origin: { y: 0.4 },
        colors: ['#fecdd3', '#fda4af', '#fb7185', '#fff1f2', '#ffd700'],
      });
    }, 2400);

    // 5. Complete & Transition to Scene 2 at exactly 3.0s
    safeTimeout(() => {
      if (!isCompleting.current) {
        isCompleting.current = true;
        onComplete();
      }
    }, 3000);
  };

  const isBoxOpened = animPhase !== 'idle';
  const scaledW     = Math.round(GIFT_NATURAL_W * giftScale);
  const scaledH     = Math.round(224 * giftScale);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)', transition: { duration: 0.8 } }}
      className="relative z-10 w-full h-full overflow-hidden flex flex-col items-center justify-start gap-3 sm:gap-4"
      style={{
        marginTop: '55px',
        paddingLeft: 'clamp(14px,4vw,22px)',
        paddingRight: 'clamp(14px,4vw,22px)',
      }}
    >
      {/* ═════════════════════════════════════════════════════════
          GROUP 1  —  Badge · Headline · Subtitle · Heart divider
          ═════════════════════════════════════════════════════════ */}
      <motion.div
        animate={isBoxOpened ? { opacity: 0.3, y: -10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full shrink-0"
        style={{ gap: 'clamp(6px,1.5vh,12px)' }}
      >
        {/* Badge pill */}
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: 'clamp(4px,1vw,6px) clamp(12px,3.4vw,18px)',
            borderRadius: '999px',
            border: '1.5px solid #e8738a',
            background: 'rgba(255,255,255,0.72)',
            fontSize: 'clamp(9px,2.3vw,11px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#9b2540',
            textTransform: 'uppercase',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 2px 8px rgba(200,80,110,0.13)',
          }}
        >
          {birthdayData.hero.badgeText}
        </motion.div>

        {/* Large serif headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="font-serif font-extrabold text-center"
          style={{
            fontSize: 'clamp(24px,7.2vw,33px)',
            lineHeight: 1.18,
            color: '#4a0020',
            margin: 0,
            maxWidth: 'clamp(260px,80vw,340px)',
          }}
        >
          "{birthdayData.hero.headline}"
        </motion.h1>

        {/* Instruction Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          style={{
            fontSize: 'clamp(11.5px,3.2vw,14px)',
            color: '#9b3050',
            textAlign: 'center',
            fontWeight: 600,
            margin: 0,
            maxWidth: 'clamp(220px,72vw,300px)',
          }}
        >
          Touch the magical gift box to unwrap your birthday surprise ✨
        </motion.p>

        {/* Heart divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          width: 'clamp(80px,22vw,120px)',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(220,120,140,0.42)' }} />
          <span style={{ fontSize: '10px', color: '#e07090', lineHeight: 1, userSelect: 'none' }}>♥</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(220,120,140,0.42)' }} />
        </div>
      </motion.div>

      {/* ═════════════════════════════════════════════════════════
          GROUP 2  —  Gift Box Hero (Interactive Cutout)
          ═════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.75, type: 'spring', stiffness: 120 }}
        style={{
          position: 'relative',
          width:  `${scaledW}px`,
          height: `${scaledH}px`,
          overflow: 'visible',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isBoxOpened ? 'default' : 'pointer',
        }}
      >
        {/* Soft pink radial ambient glow behind box */}
        <div style={{
          position: 'absolute',
          width: `${scaledW * 1.4}px`,
          height: `${scaledH * 1.4}px`,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(244,160,176,0.35) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Scaled Gift Box Cutout */}
        <div style={{
          transform: `scale(${giftScale})`,
          transformOrigin: 'center center',
          position: 'absolute',
          zIndex: 1,
        }}>
          <GiftBoxCutout isOpening={isBoxOpened} onClick={handleOpenGift} />
        </div>

        {/* Warm Golden/Pink Beam shining out of the inside when opened */}
        {isBoxOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ opacity: [0, 0.95, 0.7], scale: [0.3, 1.5, 1.2], y: -45 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute z-10 pointer-events-none"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(254,240,138,0.85) 0%, rgba(244,114,182,0.6) 45%, transparent 75%)',
              filter: 'blur(16px)',
            }}
          />
        )}

        {/* Ambient floating hearts */}
        {!isBoxOpened && HEARTS.map((h) => (
          <motion.span
            key={h.id}
            style={{
              position: 'absolute',
              top:  h.top,
              left: h.left,
              fontSize: h.sz,
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 10,
            }}
            animate={{ y: [0, -7, 0], opacity: [0.65, 1, 0.65] }}
            transition={{ repeat: Infinity, duration: h.dur, delay: h.delay, ease: 'easeInOut' }}
          >
            🩷
          </motion.span>
        ))}
      </motion.div>

      {/* ═════════════════════════════════════════════════════════
          CINEMATIC REVEAL: Beautiful Handwritten Love Letter (Rising Directly)
          ═════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isBoxOpened && (
          <motion.div
            key="cinematic-letter-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
          >
            {/* Soft romance backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-rose-950/40 backdrop-blur-sm"
            />

            {/* Glowing Golden Light Specks & Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: (i % 2 === 0 ? 1 : -1) * (15 + i * 14),
                    y: 120 + i * 18,
                    scale: 0.5 + (i % 3) * 0.3,
                  }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    y: -160 - i * 28,
                    x: (i % 2 === 0 ? 1 : -1) * (25 + i * 18) + Math.sin(i) * 35,
                    scale: [0.5, 1.3, 0.6],
                  }}
                  transition={{
                    duration: 3 + (i % 3) * 0.8,
                    delay: 0.15 + i * 0.12,
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 bottom-1/4 w-3 h-3 rounded-full bg-gradient-to-tr from-amber-200 via-pink-300 to-rose-400 blur-[1px] shadow-[0_0_10px_rgba(253,224,71,0.85)]"
                />
              ))}
            </div>

            {/* Gorgeous Handwritten Letter Card (Rising directly out of box with gentle rotation) */}
            <motion.div
              onClick={handleLetterClick}
              initial={{ y: 190, scale: 0.15, rotate: -15, opacity: 0 }}
              animate={
                animPhase === 'dissolving'
                  ? { y: -50, scale: 1.8, opacity: 0, filter: 'blur(16px)' }
                  : { y: -30, scale: 1, rotate: [-15, 6, -3, 0], opacity: 1 }
              }
              transition={
                animPhase === 'dissolving'
                  ? { duration: 0.9, ease: 'easeInOut' }
                  : { duration: 1.3, type: 'spring', stiffness: 70, damping: 13 }
              }
              className="relative w-full max-w-[320px] sm:max-w-[360px] pointer-events-auto cursor-pointer"
            >
              {/* Soft Golden/Pink Glow behind the letter card */}
              <motion.div
                animate={
                  animPhase === 'glowing'
                    ? { scale: [1, 1.25, 1.1], opacity: [0.5, 0.95, 0.7] }
                    : { scale: 1, opacity: 0.5 }
                }
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 rounded-[36px] bg-gradient-to-r from-amber-200/60 via-rose-300/70 to-pink-400/60 blur-2xl -z-10"
              />

              {/* ── Gorgeous Physical Handwritten Parchment Letter Card ── */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="relative w-full rounded-[32px] bg-gradient-to-b from-[#fffefc] via-[#fffcf4] to-[#fef8ea] border-[3px] border-[#e8d2a7] p-6 sm:p-8 shadow-[0_24px_60px_rgba(200,60,90,0.32)] text-center overflow-hidden z-20"
              >
                {/* Gold Foil Corner Accents */}
                <span className="absolute top-3.5 left-4 text-amber-400 text-xs select-none">✦</span>
                <span className="absolute top-3.5 right-4 text-amber-400 text-xs select-none">✦</span>
                <span className="absolute bottom-3.5 left-4 text-pink-300 text-xs select-none">♥</span>
                <span className="absolute bottom-3.5 right-4 text-pink-300 text-xs select-none">♥</span>

                {/* Inner Romantic Paper Border */}
                <div className="border border-[#dfc491]/60 rounded-[24px] p-5 sm:p-6 bg-white/50 backdrop-blur-xs flex flex-col items-center justify-center">
                  
                  {/* Wax Seal / Rose Badge Header */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-rose-300 to-amber-400 border-2 border-white shadow-md flex items-center justify-center text-rose-950 font-bold text-sm mb-2"
                  >
                    🌹
                  </motion.div>

                  {/* Sparkling golden light */}
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.2, 0.9] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="text-amber-400 text-xs select-none mb-1"
                  >
                    ✨
                  </motion.span>

                  {/* Handwritten Message */}
                  <h2 className="font-serif italic font-extrabold text-[#4a0020] text-lg sm:text-xl md:text-2xl leading-relaxed drop-shadow-sm my-2">
                    “For the girl who makes ordinary days feel special… ❤️”
                  </h2>

                  {/* Heart Divider line */}
                  <div className="flex items-center gap-2 mt-3 w-28">
                    <div className="flex-1 h-[1px] bg-rose-300/60" />
                    <span className="text-xs text-rose-400">♥</span>
                    <div className="flex-1 h-[1px] bg-rose-300/60" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
