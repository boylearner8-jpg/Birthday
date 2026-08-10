import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const AudioToggle = () => {
  const { isMuted, isPlaying, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border-2 border-pink-300 text-rose-900 shadow-md hover:bg-white hover:border-pink-400 hover:shadow-lg transition-all duration-300 group cursor-pointer"
    >
      <div className="relative flex items-center justify-center">
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
        )}
      </div>

      <span className="text-xs font-bold tracking-wider text-rose-800">
        {isMuted ? "Sound Off" : "Music"}
      </span>

      {!isMuted && isPlaying && (
        <div className="flex items-end gap-0.5 h-3 ml-1">
          <span className="w-0.5 bg-rose-500 rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
          <span className="w-0.5 bg-pink-500 rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
          <span className="w-0.5 bg-rose-400 rounded-full animate-[bounce_1s_infinite_200ms] h-5/6" />
        </div>
      )}
    </button>
  );
};
