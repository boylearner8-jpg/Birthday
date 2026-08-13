import React from 'react';

export const BackgroundCanvas = React.memo(({ activeScene }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Full-screen scrapbook background for post-login scenes */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/main_bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
});
