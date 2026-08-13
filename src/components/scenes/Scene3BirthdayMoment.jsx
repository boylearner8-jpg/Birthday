import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { birthdayData } from '../../data/birthdayData';
import { useSound } from '../../context/SoundContext';

// Candle tip positions — % coords relative to cake container
const candlePositions = [
  { id: 0, top: '15.5%', left: '20.2%' },
  { id: 1, top: '26.5%', left: '37.0%' },
  { id: 2, top: '8.0%',  left: '47.2%' },
  { id: 3, top: '26.0%', left: '62.5%' },
  { id: 4, top: '13.8%', left: '70.5%' },
];

export const Scene3BirthdayMoment = ({ onNext }) => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allBlown,   setAllBlown]   = useState(false);
  const { playSfx } = useSound();

  /* ── existing candle logic — untouched ── */
  const handleExtinguishCandle = (index) => {
    if (!candlesLit[index]) return;
    playSfx('candleBlow');
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);
    if (updated.every((s) => !s)) {
      setAllBlown(true);
      playSfx('chime');
      confetti({ particleCount: 80, spread: 120, origin: { y: 0.5 },
        colors: ['#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#fff1f2'] });
    }
  };

  const handleExtinguishAll = () => {
    if (allBlown) return;
    playSfx('candleBlow');
    setCandlesLit([false,false,false,false,false]);
    setAllBlown(true);
    playSfx('chime');
    confetti({ particleCount: 85, spread: 130, origin: { y: 0.5 },
      colors: ['#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#fff1f2'] });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      /*
       * h-full fills exactly the flex-1 main area.
       * justify-between distributes the 5 groups across that space —
       * no scroll needed on any mobile viewport.
       */
      className="relative z-10 w-full h-full overflow-hidden flex flex-col items-center justify-between"
      style={{ padding: 'clamp(6px,1.6vh,14px) clamp(10px,3vw,18px)' }}
    >

      {/* ═══════════════════════════════════════════════════════
          GROUP 1  —  Badge · Title · Subtitle · Divider
          ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col items-center w-full shrink-0"
           style={{ gap: 'clamp(3px,0.7vh,6px)', marginTop: 'clamp(16px,3vh,28px)' }}>

        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: 'clamp(4px,1vw,6px) clamp(12px,3.5vw,18px)',
            borderRadius: '999px',
            border: '1.5px solid #f4a0b0',
            background: 'rgba(255,255,255,0.78)',
            fontSize: 'clamp(9px,2.4vw,11px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#c0445a',
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(200,80,110,0.12)',
          }}
        >
          THE MAGIC MOMENT ✨
        </motion.div>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="font-serif font-extrabold text-center"
          style={{
            fontSize: 'clamp(21px,6vw,30px)',
            lineHeight: 1.18,
            color: '#4a0020',
            margin: 0,
          }}
        >
          Happy Birthday, Baby ❤️
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          style={{
            fontSize: 'clamp(10.5px,2.9vw,13px)',
            color: '#9b3050',
            textAlign: 'center',
            margin: 0,
          }}
        >
          {allBlown
            ? birthdayData.birthdayMoment.postBlowText
            : birthdayData.birthdayMoment.instruction}
        </motion.p>

        {/* Heart divider */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', width:'clamp(90px,25vw,130px)' }}>
          <div style={{ flex:1, height:'1px', background:'rgba(220,120,140,0.42)' }} />
          <span style={{ fontSize:'10px', color:'#e07090', lineHeight:1 }}>♥</span>
          <div style={{ flex:1, height:'1px', background:'rgba(220,120,140,0.42)' }} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          GROUP 2  —  Memory frame (gingham, landscape, rotated)
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.28, duration: 0.6, type: 'spring', stiffness: 130 }}
        className="relative shrink-0"
        style={{
          width: 'clamp(196px,66vw,264px)',
          aspectRatio: '1.52 / 1',
          transform: 'rotate(-3deg)',
          /* gingham border via repeating-gradient */
          padding: '10px',
          borderRadius: '10px',
          background: `
            repeating-linear-gradient(
              45deg,
              #f9b8c8 0px, #f9b8c8 6px,
              #fde8ef 6px, #fde8ef 12px
            )
          `,
          boxShadow: '0 8px 24px rgba(200,80,110,0.22), 0 2px 8px rgba(200,80,110,0.10)',
        }}
      >
        {/* Photo inside frame */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src="/images/couple_cat_1.webp"
            alt="Our Sweet Memories"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0, insetX: 0,
            background: 'linear-gradient(to top, rgba(74,0,32,0.6) 0%, transparent 100%)',
            padding: '4px 6px',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: 'clamp(9px,2.5vw,11px)',
              color: '#fff',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              margin: 0,
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}>
              Our Sweet Memories 💕
            </p>
          </div>
        </div>

        {/* 🌸 flower — top-left */}
        <span style={{
          position:'absolute', top:'-16px', left:'-12px',
          fontSize:'clamp(24px,7vw,34px)',
          filter:'drop-shadow(0 2px 4px rgba(200,80,110,0.28))',
          lineHeight:1, userSelect:'none', pointerEvents:'none',
          transform:'rotate(3deg)',
        }}>🌸</span>

        {/* 🩷 heart — bottom-right */}
        <span style={{
          position:'absolute', bottom:'-13px', right:'-8px',
          fontSize:'clamp(22px,6.5vw,30px)',
          filter:'drop-shadow(0 3px 6px rgba(220,80,110,0.32))',
          lineHeight:1, userSelect:'none', pointerEvents:'none',
          transform:'rotate(-5deg)',
        }}>🩷</span>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          GROUP 3  —  Birthday Cake + interactive candle flames
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.55 }}
        className="relative shrink-0"
        style={{
          width: 'clamp(155px,54vw,220px)',
          aspectRatio: '1 / 0.84',
          filter: 'drop-shadow(0 8px 18px rgba(200,80,110,0.28))',
        }}
      >
        <img
          src="/images/strawberry_cake.webp"
          alt="Strawberry Birthday Cake"
          style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }}
          draggable="false"
        />

        {/* Candle flames */}
        {candlePositions.map((pos, index) => {
          const isLit = candlesLit[index];
          return (
            <div
              key={pos.id}
              onClick={() => handleExtinguishCandle(index)}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%,-85%)',
                cursor: 'pointer',
                zIndex: 30,
                padding: '8px',
              }}
            >
              <AnimatePresence>
                {isLit ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0.9, 1.12, 0.95] }}
                    exit={{ opacity: 0, y: -14, scale: 0 }}
                    transition={{ repeat: Infinity, duration: 1.2, repeatType: 'reverse' }}
                    style={{ position: 'relative' }}
                  >
                    <div
                      className="animate-flicker"
                      style={{
                        width:  'clamp(9px,2.5vw,13px)',
                        height: 'clamp(13px,3.5vw,18px)',
                        background: 'linear-gradient(to top, #d97706, #f97316, #fef08a)',
                        borderRadius: '60% 60% 40% 40% / 60% 60% 40% 40%',
                        boxShadow: '0 0 12px 3px rgba(251,146,60,0.65)',
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.span
                    key="puff"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.85 }}
                    style={{ fontSize: '12px' }}
                  >💨</motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          GROUP 4  —  Instruction / wish pill & Relive Button
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-40 flex flex-col items-center shrink-0 w-full" style={{ gap: '12px', marginBottom: '10px' }}>
        <AnimatePresence mode="wait">
          {!allBlown ? (
            <motion.button
              key="blow-btn"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.48 }}
              onClick={handleExtinguishAll}
              className="flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 hover:bg-pink-50"
              style={{
                width: 'clamp(150px,45vw,190px)',
                height: 'clamp(38px,10vw,48px)',
                borderRadius: '35px',
                border: '2px solid #f4a8b8',
                background: 'rgba(255,255,255,0.88)',
                fontSize: 'clamp(11px,3.1vw,14px)',
                fontWeight: 600,
                color: '#c0445a',
                boxShadow: '0 3px 12px rgba(200,80,110,0.13)',
              }}
            >
              Blow ✨
            </motion.button>
          ) : (
            <motion.div
              key="wish-pill"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center"
              style={{
                width: 'clamp(218px,78vw,305px)',
                height: 'clamp(40px,10.5vw,52px)',
                borderRadius: '35px',
                border: '2px solid #f4a8b8',
                background: 'rgba(255,255,255,0.90)',
                fontSize: 'clamp(12px,3.3vw,15px)',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                color: '#9b3050',
              }}
            >
              {birthdayData.birthdayMoment.wishPrompt}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Relive Memories button — below pill */}
        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.04 }}
          style={{
            width: 'clamp(158px,46vw,200px)',
            height: 'clamp(42px,11vw,52px)',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 55%, #db2777 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 'clamp(11px,3vw,14px)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 5px 18px rgba(236,72,153,0.42)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          Relive Memories 🖼️
        </motion.button>
      </div>

    </motion.div>
  );
};
