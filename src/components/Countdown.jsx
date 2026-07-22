import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, floatAnimation } from '../utils/animations';

const Countdown = ({ onSkip }) => {
  const [timeLeft, setTimeLeft] = useState({ Hari: 0, Jam: 0, Menit: 0, Detik: 5 });

  useEffect(() => {
    let seconds = 5;
    const interval = setInterval(() => {
      seconds -= 1;
      if (seconds >= 0) {
        setTimeLeft({ Hari: 0, Jam: 0, Menit: 0, Detik: seconds });
      } else {
        clearInterval(interval);
        onSkip();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onSkip]);

  // Generate random hearts and sparkles once
  const decorations = useMemo(() => {
    const hearts = Array.from({ length: 20 }).map((_, i) => ({
      id: `heart-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 15 + 10,
      opacity: Math.random() * 0.4 + 0.2
    }));

    const sparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: `sparkle-${i}`,
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
        // Dark aesthetic with pink hints
        background: 'radial-gradient(circle at center, #2b0b16 0%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Blinking Sparkles (Blink Blink) */}
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

      <div style={{ textAlign: 'center', zIndex: 10, width: '100%', maxWidth: '800px', padding: '20px' }}>
        <div style={{ padding: '20px' }}>
          <motion.p
            style={{
              color: '#fff',
              fontSize: '1.2rem',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '10px',
              opacity: 0.8
            }}
          >
            Menghitung Hari
          </motion.p>
          <motion.h1 
            style={{ 
              color: 'var(--primary-pink)', 
              fontSize: '3.5rem', 
              marginBottom: '50px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(248, 187, 208, 0.4)'
            }}
          >
            Her Special Day ❤️
          </motion.h1>

          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            marginBottom: '50px',
            flexWrap: 'wrap'
          }}>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div 
                  animate={floatAnimation}
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(10, 10, 10, 0.8)',
                    padding: '25px 20px',
                    borderRadius: '20px',
                    minWidth: '120px',
                    border: '1px solid rgba(233, 30, 99, 0.3)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5), inset 0 0 15px rgba(233,30,99,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '15px'
                  }}
                >
                  {/* Subtle highlight effect on the card */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(248,187,208,0.05) 0%, transparent 60%)',
                    zIndex: 0
                  }} />
                  
                  <div style={{
                    fontSize: '4.5rem',
                    fontWeight: '700',
                    color: '#fff',
                    textShadow: '0 0 15px rgba(255,255,255,0.3)',
                    zIndex: 1,
                    lineHeight: '1'
                  }}>
                    {value.toString().padStart(2, '0')}
                  </div>
                </motion.div>
                <div style={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: '3px', 
                  fontSize: '0.9rem',
                  color: 'var(--primary-pink)',
                  fontWeight: '500'
                }}>
                  {unit}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Countdown;
