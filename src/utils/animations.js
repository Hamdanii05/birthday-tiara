// src/utils/animations.js
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -30,
    transition: { duration: 0.5, ease: "easeIn" }
  }
};

export const floatAnimation = {
  y: ["-5%", "5%"],
  transition: {
    y: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export const heartPulse = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, type: "spring", bounce: 0.4 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.4 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
