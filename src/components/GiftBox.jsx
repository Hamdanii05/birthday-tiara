import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, scaleUp } from '../utils/animations';
import { Gift } from 'lucide-react';
import { bgMusic } from '../utils/audio';

const GiftBox = ({ onOpen }) => {
  // Generate random hearts and sparkles for the background
  const decorations = useMemo(() => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: `gift-heart-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 15 + 10,
      opacity: Math.random() * 0.4 + 0.2
    }));

    const sparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: `gift-sparkle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      size: Math.random() * 4 + 2,
    }));

    return { hearts, sparkles };
  }, []);

  return (
    <motion.div 
      className="full-screen flex-center"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        background: 'radial-gradient(circle at center, #2b0b16 0%, #0a0a0a 100%)',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Blinking Sparkles */}
      {decorations.sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          style={{
            position: 'absolute',
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 10px #F8BBD0, 0 0 20px #E91E63',
            zIndex: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Hearts */}
      {decorations.hearts.map(heart => (
        <motion.div
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.left,
            top: heart.top,
            fontSize: `${heart.size}px`,
            color: '#E91E63',
            opacity: heart.opacity,
            zIndex: 0,
            textShadow: '0 0 15px rgba(233,30,99,0.8)'
          }}
          animate={{
            y: ["0%", "-100%", "0%"],
            x: ["0%", "30%", "0%"],
            rotate: [0, 20, -20, 0]
          }}
          transition={{
            duration: 10 + heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.h2 
        style={{ 
          fontSize: '4rem', 
          color: 'var(--primary-pink)',
          marginBottom: '50px',
          fontFamily: "'Dancing Script', cursive",
          fontWeight: 700,
          textShadow: '0 0 15px rgba(233, 30, 99, 0.4)',
          zIndex: 10
        }}
        variants={scaleUp}
      >
        Ada sesuatu untukmu...
      </motion.h2>

      <motion.div
        style={{
          cursor: 'pointer',
          background: 'rgba(20, 20, 20, 0.6)',
          backdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '30px',
          border: '1px solid rgba(233, 30, 99, 0.3)',
          boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(233, 30, 99, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, -5, 5, 0],
          boxShadow: '0 0 40px rgba(233, 30, 99, 0.5), inset 0 0 30px rgba(233, 30, 99, 0.4)',
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          bgMusic.play().catch(e => console.log('Audio diputar manual oleh interaksi pengguna:', e));
          onOpen();
        }}
      >
        <Gift size={120} color="var(--primary-pink)" strokeWidth={1.5} />
      </motion.div>
      
      <motion.p
        style={{
          marginTop: '30px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '1.2rem',
          letterSpacing: '2px',
          zIndex: 10,
          textTransform: 'uppercase'
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Klik Kadonya
      </motion.p>
    </motion.div>
  );
};

export default GiftBox;
