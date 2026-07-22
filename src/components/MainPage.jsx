import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '../utils/animations';

const MainPage = ({ onNext }) => {
  // Using user's uploaded photos for polaroids
  const photos = [
    "/photos/foto1.jpeg",
    "/photos/foto2.jpeg",
    "/photos/foto3.jpeg",
    "/photos/foto4.jpeg",
    "/photos/foto5.jpeg",
    "/photos/foto6.jpeg"
  ];

  // Random rotations between -15 and 15 deg
  const getRotation = () => Math.random() * 30 - 15;

  // Generate random blurred hearts and sparkles for the background
  const decorations = useMemo(() => {
    const hearts = Array.from({ length: 25 }).map((_, i) => ({
      id: `main-heart-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 60 + 30,
      opacity: Math.random() * 0.3 + 0.1,
      blur: Math.random() * 4 + 2 // 2px to 6px blur for depth effect
    }));

    const sparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: `main-sparkle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      size: Math.random() * 4 + 2,
    }));

    return { hearts, sparkles };
  }, []);

  return (
    <motion.div
      className="full-screen"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        display: 'flex',
        padding: '50px',
        background: 'radial-gradient(circle at center, #2b0b16 0%, #0a0a0a 100%)',
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

      {/* Floating Blurred Hearts */}
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
            filter: `blur(${heart.blur}px)`,
            zIndex: 0,
            textShadow: '0 0 15px rgba(233,30,99,0.8)'
          }}
          animate={{
            y: ["0%", "-100%", "0%"],
            x: ["0%", "30%", "0%"],
            rotate: [0, 20, -20, 0]
          }}
          transition={{
            duration: 12 + heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Left Photos */}
      <motion.div 
        style={{ flex: 1, position: 'relative' }}
        variants={staggerContainer}
      >
        {photos.slice(0, 3).map((url, i) => (
          <motion.div
            key={i}
            className="polaroid"
            style={{
              position: 'absolute',
              top: `${i * 25}%`,
              left: `${(i % 2) * 20}%`,
              width: '200px',
              height: '240px',
              rotate: getRotation(),
              zIndex: i + 5
            }}
            variants={slideUp}
            whileHover={{ scale: 1.1, zIndex: 20, rotate: 0 }}
          >
            <img src={url} alt="Memory" />
          </motion.div>
        ))}
      </motion.div>

      {/* Center Content */}
      <motion.div 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 15,
          textAlign: 'center'
        }}
        variants={slideUp}
      >
        <p style={{
          color: 'var(--primary-pink)',
          fontSize: '1rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '15px',
          fontWeight: 600
        }}>
          A Love Letter For You
        </p>

        <h1 style={{
          fontSize: '3.8rem',
          color: '#ffffff',
          marginBottom: '10px',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
          lineHeight: '1.2'
        }}>
          Your <br /> Special Day
        </h1>

        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1.8rem',
          fontFamily: "'Dancing Script', cursive",
          marginBottom: '50px'
        }}>
          created with love, just for you
        </p>
        
        <button className="btn-primary" onClick={onNext}>
          Read My Letter
        </button>
      </motion.div>

      {/* Right Photos */}
      <motion.div 
        style={{ flex: 1, position: 'relative' }}
        variants={staggerContainer}
      >
        {photos.slice(3, 6).map((url, i) => (
          <motion.div
            key={i + 3}
            className="polaroid"
            style={{
              position: 'absolute',
              top: `${i * 25}%`,
              right: `${(i % 2) * 20}%`,
              width: '200px',
              height: '240px',
              rotate: getRotation(),
              zIndex: i + 5
            }}
            variants={slideUp}
            whileHover={{ scale: 1.1, zIndex: 20, rotate: 0 }}
          >
            <img src={url} alt="Memory" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MainPage;
