/**
 * Birthday Surprise Configuration File
 * Customize all text, memory photos, gifts, love letter, and audio here.
 */

export const birthdayData = {
  // Avatar Character Cutout Asset
  avatarImage: "/images/cute_avatar.png",

  // Passcode Lock Screen Config
  passcode: {
    enabled: true,
    code: "1234", // Default 4-digit passcode (Customize to birthday e.g. "0810" or anniversary)
    hint: "Enter your secret birthday passcode 🔐",
    title: "Enter a passcode",
    coupleImage: "/images/couple_cat_1.jpg",
    flowerColor: "#fda4af",
  },

  // Recipient details
  recipientName: "Baby",
  senderName: "With all my love",

  // Scene 1 - Hero / Intro
  hero: {
    badgeText: "A Digital Gift For You 🎁",
    headline: "If I say someone gifted me this...",
    subtext: "Touch the magical gift box to unwrap your birthday surprise.",
    actionPrompt: "Tap to Open 🎁",
  },

  // Scene 2 - Interactive Surprise Gift Boxes
  gifts: [
    {
      id: 1,
      boxTitle: "Secret #1",
      iconName: "Heart",
      badge: "Heartfelt Message",
      previewText: "A message straight from my heart...",
      title: "Why You Mean The World To Me",
      content: "From the moment you entered my life, everything became brighter, warmer, and infinitely more beautiful. You bring endless joy and laughter to my days, and your smile is my absolute favorite sight in the universe.",
      accentColor: "from-rose-500 to-pink-600",
    },
    {
      id: 2,
      boxTitle: "Secret #2",
      iconName: "Sparkles",
      badge: "Precious Memory",
      previewText: "A look back at our unforgettable moments...",
      title: "Moments Captured In Time",
      content: "We have created so many unforgettable memories together. Every trip, late-night conversation, shared cup of coffee, and silent laugh holds a special place in my soul. Here's to making a million more.",
      accentColor: "from-amber-400 to-orange-500",
    },
    {
      id: 3,
      boxTitle: "Secret #3",
      iconName: "Gift",
      badge: "Birthday Wish Ticket",
      previewText: "Your ultimate birthday privilege voucher...",
      title: "Golden Birthday Voucher 🎟️",
      content: "This ticket entitles you to: Unlimited hugs, your favorite home-cooked dinner, a surprise weekend getaway, and whatever wish your heart desires today. Redeemable anytime, no expiration!",
      accentColor: "from-purple-500 to-indigo-600",
    }
  ],

  // Scene 3 - Birthday Moment & Cake
  birthdayMoment: {
    headline: "Happy Birthday, Baby ❤️",
    subtext: "The room grows quiet, the candles sparkle just for you.",
    instruction: "Tap on the candles to blow them out...",
    wishPrompt: "Make a wish... ✨",
    postBlowText: "May all your dreams turn into reality this year.",
    candleCount: 3,
  },

  // Scene 4 - Memories Stack
  memories: {
    headline: "Our Chapter of Memories 📸",
    subtext: "Swipe or drag the physical photos to relive our journey.",
    photos: [
      {
        id: 1,
        image: "/images/couple_cat_1.jpg",
        caption: "Where our story began ❤️",
        location: "Sunset Point",
        date: "Special Day",
        rotation: -4,
      },
      {
        id: 2,
        image: "/images/couple_cat_2.jpg",
        caption: "Your infectious laugh that melts my heart ✨",
        location: "Cozy Evening",
        date: "Unforgettable Moment",
        rotation: 3,
      },
      {
        id: 3,
        image: "/images/couple_cat_3.jpg",
        caption: "Every adventure is magical with you 🌌",
        location: "Under the Stars",
        date: "Stargazing Night",
        rotation: -2,
      },
      {
        id: 4,
        image: "/images/couple_cat_4.jpg",
        caption: "Here's to a lifetime of love and happiness 🥂",
        location: "Celebration",
        date: "Forever & Always",
        rotation: 5,
      }
    ]
  },

  // Scene 5 - Love Letter
  loveLetter: {
    headline: "There's one more thing...",
    envelopeLabel: "Open My Heart ✉️",
    salutation: "Happy Birthday, my love,",
    body: [
      "You deserve every beautiful thing in this world. Being able to celebrate you today fills me with so much gratitude and warmth.",
      "I'm so lucky to have you in my life. You inspire me to be a better person every single day, and your kindness shines brighter than any star in the night sky.",
      "I hope this new year brings you boundless joy, serenity, passion, and everything you've been secretly wishing for.",
      "I love you, today, tomorrow, and forever ❤️"
    ],
    closing: "Forever yours,"
  },

  // Scene 6 - Final Surprise & Finale
  finale: {
    headline: "One last surprise...",
    title: "Happy Birthday, My Entire World ❤️",
    subtext: "Thank you for filling my life with pure magic.",
    featuredImage: "/images/couple_cat_3.jpg",
    replayButtonText: "Replay the Surprise 🔄",
  },

  // Sound Audio Tracks & SFX (Using Web Audio synthesis + high reliability royalty-free CDN audio links)
  audio: {
    bgmUrl: "https://assets.mixkit.co/music/preview/mixkit-romantic-sunlight-600.mp3",
    sfx: {
      giftOpen: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3",
      candleBlow: "https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3",
      chime: "https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3",
      letterOpen: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
    }
  }
};
