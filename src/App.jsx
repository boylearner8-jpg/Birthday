import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Lock, KeyRound } from 'lucide-react';
import { SoundProvider } from './context/SoundContext';
import { AudioToggle } from './components/layout/AudioToggle';
import { BackgroundCanvas } from './components/canvas/BackgroundCanvas';
import { CuteCompanion } from './components/common/CuteCompanion';
import { birthdayData } from './data/birthdayData';

import { Scene0Passcode } from './components/scenes/Scene0Passcode';
import { Scene1Opening } from './components/scenes/Scene1Opening';
import { Scene2Surprise } from './components/scenes/Scene2Surprise';
import { Scene3BirthdayMoment } from './components/scenes/Scene3BirthdayMoment';
import { Scene4Memories } from './components/scenes/Scene4Memories';
import { Scene5LoveLetter } from './components/scenes/Scene5LoveLetter';
import { Scene6FinalReveal } from './components/scenes/Scene6FinalReveal';

export default function App() {
  const isPasscodeEnabled = birthdayData.passcode?.enabled ?? true;

  const [isUnlocked, setIsUnlocked] = useState(!isPasscodeEnabled);
  const [scene, setScene] = useState(isPasscodeEnabled ? 0 : 1);
  const [customCompanionDialogue, setCustomCompanionDialogue] = useState(null);

  // Hard lock: prevents nextScene from firing more than once per 1.5 seconds
  const isTransitioning = useRef(false);

  const handleUnlockPasscode = () => {
    setIsUnlocked(true);
    setScene(1);
    setCustomCompanionDialogue(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextScene = () => {
    if (!isUnlocked && isPasscodeEnabled) return;
    // Guard: ignore if a transition is already in progress
    if (isTransitioning.current) {
      console.warn('[Scene] nextScene blocked — transition already in progress');
      return;
    }
    isTransitioning.current = true;

    setCustomCompanionDialogue(null);

    setScene((prev) => {
      const next = Math.min(prev + 1, 6);
      console.log(`[Scene] Transitioning: ${prev} → ${next}`);
      return next;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Unlock after 1.5s so no double-fires can skip scenes
    setTimeout(() => {
      isTransitioning.current = false;
    }, 1500);
  };

  const restartExperience = () => {
    isTransitioning.current = false;
    setCustomCompanionDialogue(null);
    if (isPasscodeEnabled) {
      setIsUnlocked(false);
      setScene(0);
    } else {
      setScene(1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render exactly one scene at a time
  const renderActiveScene = () => {
    if (!isUnlocked && isPasscodeEnabled) {
      return <Scene0Passcode key="scene-0" onUnlock={handleUnlockPasscode} />;
    }
    switch (scene) {
      case 1:
        return <Scene1Opening key="scene-1" onComplete={nextScene} />;
      case 2:
        return <Scene2Surprise key="scene-2" onNext={nextScene} />;
      case 3:
        return <Scene3BirthdayMoment key="scene-3" onNext={nextScene} />;
      case 4:
        return <Scene4Memories key="scene-4" onNext={nextScene} />;
      case 5:
        return <Scene5LoveLetter key="scene-5" onNext={nextScene} setCustomDialogue={setCustomCompanionDialogue} />;
      case 6:
        return <Scene6FinalReveal key="scene-6" onReplay={restartExperience} />;
      default:
        return <Scene1Opening key="scene-1-fallback" onComplete={nextScene} />;
    }
  };

  return (
    <SoundProvider>
      <div className="relative h-screen max-h-screen w-full overflow-hidden text-slate-100 flex flex-col justify-between selection:bg-rose-500/30">
        <BackgroundCanvas activeScene={scene} />

        <header className="relative z-40 px-4 py-2 flex justify-between items-center max-w-6xl mx-auto w-full shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="font-serif font-extrabold text-rose-950 text-sm md:text-base tracking-wide drop-shadow-sm">
              Birthday Experience
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AudioToggle />
          </div>
        </header>

        <main className="relative z-10 flex-1 flex flex-col items-center justify-center overflow-hidden w-full max-w-6xl mx-auto px-2">
          <AnimatePresence mode="wait">
            {renderActiveScene()}
          </AnimatePresence>
        </main>

        <CuteCompanion activeScene={isUnlocked ? scene : 0} customDialogue={customCompanionDialogue} />

        <footer className="relative z-40 py-1.5 px-4 max-w-md mx-auto w-full flex justify-center items-center shrink-0">
          <p className="text-[10px] md:text-[11px] text-rose-900 font-extrabold font-mono tracking-widest uppercase text-center drop-shadow-sm">
            Made with ❤️ for {birthdayData.recipientName}
          </p>
        </footer>
      </div>
    </SoundProvider>
  );
}
