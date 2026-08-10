import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GiftBoxCutout } from '../common/GiftBoxCutout';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

/*
 * GiftBoxCutout renders at exactly w-52 = 208px / h-56 = 224px.
 * We scale the whole box div so the gift fills ~68vw (capped at 270px).
 */
const GIFT_NATURAL_W = 208;

/* Floating hearts — % positions relative to the SCALED gift wrapper */
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
  const [isOpening, setIsOpening]   = useState(false);
  const [giftScale,  setGiftScale]  = useState(1);
  const { playSfx, unlockAudio } = useSound();
  const hasTriggered = useRef(false);

  /* Compute scale once after mount (viewport width is fixed on mobile) */
  useEffect(() => {
    const targetW = Math.min(Math.max(window.innerWidth * 0.72, 210), 280);
    setGiftScale(targetW / GIFT_NATURAL_W);
  }, []);

  /* ── Existing gift open logic — untouched ── */
  const handleOpenGift = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setIsOpening(true);
    unlockAudio();
    playSfx('giftOpen');
    confetti({
      particleCount: 110,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#fff1f2'],
    });
    setTimeout(() => { onComplete(); }, 1800);
  };

  /* Scaled gift box dimensions used to reserve correct layout space */
  const scaledW = Math.round(GIFT_NATURAL_W * giftScale);
  const scaledH = Math.round(224        * giftScale);  /* h-56 = 224px */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8 } }}
      className="relative z-10 w-full h-full overflow-hidden flex flex-col items-center justify-start gap-3 sm:gap-4"
      style={{
        marginTop: '65px',
        paddingLeft: 'clamp(14px,4vw,22px)',
        paddingRight: 'clamp(14px,4vw,22px)',
      }}
    >
      {/* ═════════════════════════════════════════════════════════
          GROUP 1  —  Badge · Headline · Subtitle · Heart divider
          ═════════════════════════════════════════════════════════ */}
      <div
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

        {/* ─────── ♥ ─────── divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          width: 'clamp(80px,22vw,120px)',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(220,120,140,0.42)' }} />
          <span style={{ fontSize: '10px', color: '#e07090', lineHeight: 1, userSelect: 'none' }}>♥</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(220,120,140,0.42)' }} />
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════
          GROUP 2  —  Gift box hero  (scaled, centered, interactive)
          ═════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
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
          cursor: 'pointer',
        }}
      >
        {/* Soft pink radial glow behind the gift */}
        <div style={{
          position: 'absolute',
          width: `${scaledW * 1.4}px`,
          height: `${scaledH * 1.4}px`,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(244,160,176,0.32) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* GiftBoxCutout — natural size, then CSS-scaled */}
        <div style={{
          transform: `scale(${giftScale})`,
          transformOrigin: 'center center',
          position: 'absolute',
          zIndex: 1,
        }}>
          <GiftBoxCutout isOpening={isOpening} onClick={handleOpenGift} />
        </div>

        {/* Floating hearts positioned relative to the scaled wrapper */}
        {HEARTS.map((h) => (
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
    </motion.div>
  );
};
