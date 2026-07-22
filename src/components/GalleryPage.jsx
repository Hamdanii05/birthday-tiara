import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '../utils/animations';

const GalleryPage = ({ onNext }) => {
  // Menggunakan 22 foto yang benar-benar ada (foto19 tidak ada di folder)
  const availablePhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23];
  const photos = availablePhotos.map(num => `/photos/foto${num}.jpeg`);

  // Random rotations between -10 and 10 deg
  const getRotation = () => Math.random() * 20 - 10;

  // Generate random blurred hearts and sparkles for the background
  const decorations = useMemo(() => {
    const sparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: `gallery-sparkle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      size: Math.random() * 4 + 2,
    }));

    return { sparkles };
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
        flexDirection: 'column',
        padding: '50px 30px', // Extra top padding for the title
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

      <motion.h2 
        style={{
          color: 'var(--primary-pink)',
          fontSize: '3rem',
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif",
          textShadow: '0 0 20px rgba(233, 30, 99, 0.4)',
          marginBottom: '30px',
          zIndex: 10
        }}
        variants={slideUp}
      >
        My Mine
      </motion.h2>

      <motion.div 
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
          padding: '20px',
          zIndex: 10
        }}
        variants={staggerContainer}
      >
        {photos.map((url, i) => (
          <motion.div
            key={i}
            className="polaroid"
            style={{
              width: '200px',
              height: '240px',
              rotate: getRotation(),
              position: 'relative' // relative flow inside flex container
            }}
            variants={slideUp}
            whileHover={{ scale: 1.15, zIndex: 20, rotate: 0 }}
          >
            <img src={url} alt={`Memory ${i+1}`} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="btn-primary"
        onClick={onNext}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          zIndex: 50,
          background: 'rgba(233, 30, 99, 0.2)',
          border: '1px solid var(--primary-pink)',
          color: 'var(--primary-pink)',
          padding: '10px 20px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '1rem',
          letterSpacing: '1px'
        }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

export default GalleryPage;
