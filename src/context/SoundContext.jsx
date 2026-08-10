import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { birthdayData } from '../data/birthdayData';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  
  const bgmRef = useRef(null);

  // Initialize Howl background music
  useEffect(() => {
    bgmRef.current = new Howl({
      src: [birthdayData.audio.bgmUrl],
      html5: true, // Force HTML5 Audio to allow streaming large music files
      loop: true,
      volume: 0.35,
      autoplay: false,
      onloaderror: (id, err) => {
        console.warn("BGM CDN load fallback active:", err);
      }
    });

    return () => {
      if (bgmRef.current) {
        bgmRef.current.unload();
      }
    };
  }, []);

  // Unlock web audio on first interaction
  const unlockAudio = () => {
    if (!audioUnlocked) {
      setAudioUnlocked(true);
      if (Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume();
      }
      if (bgmRef.current && !isPlaying && !isMuted) {
        bgmRef.current.play();
        bgmRef.current.fade(0, 0.35, 2000);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    Howler.mute(newMuteState);

    if (bgmRef.current) {
      if (newMuteState) {
        bgmRef.current.pause();
        setIsPlaying(false);
      } else {
        unlockAudio();
        bgmRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Synthetic Web Audio SFX fallbacks (Guarantees crisp sound on any device/network)
  const playSyntheticSound = (type) => {
    try {
      const ctx = Howler.ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'giftOpen') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'candleBlow') {
        // Soft wind / noise effect simulation
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'chime' || type === 'sparkle') {
        // High sparkle bell
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'letterOpen') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(329.63, now); // E4
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.35);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      console.warn("Synthetic sound fallback error:", e);
    }
  };

  const playSfx = (type) => {
    if (isMuted) return;
    unlockAudio();
    playSyntheticSound(type);
  };

  return (
    <SoundContext.Provider value={{ isMuted, isPlaying, toggleMute, unlockAudio, playSfx }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
