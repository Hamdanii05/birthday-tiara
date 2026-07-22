import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { fadeIn, heartPulse, scaleUp } from '../utils/animations';

const FinalSurprise = ({ onNext }) => {
  // Menggunakan 22 foto yang benar-benar ada (foto19 tidak ada di folder)
  const availablePhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23];
  const photos = availablePhotos.map(num => `/photos/foto${num}.jpeg`);

  useEffect(() => {
    // Fire confetti when component mounts
    const end = Date.now() + 5 * 1000;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F8BBD0', '#E91E63', '#ffffff']
      });
      
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F8BBD0', '#E91E63', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  // Generate positions along a heart shape path and random rotations
  const stackPositions = useMemo(() => {
    return photos.map((_, index) => {
      // Parametric equation for a heart
      const t = (index / photos.length) * Math.PI * 2;
      const scale = 16; // Increased scale to make it bigger overall
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      
      const rotation = 0; // Lurus, tidak miring
      
      // Invert y because CSS coordinates go down. Multiply x by 1.2 to widen it slightly.
      return { x: x * scale * 1.2, y: -y * scale, rotate: rotation };
    });
  }, [photos]);

  // Background decorations matching previous pages
  const decorations = useMemo(() => {
    const sparkles = Array.from({ length: 50 }).map((_, i) => ({
      id: `fs-sparkle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      size: Math.random() * 5 + 2,
    }));
    return { sparkles };
  }, []);

  return (
    <motion.div 
      className="full-screen flex-center"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        background: 'radial-gradient(circle at center, #2b0b16 0%, #0a0a0a 100%)', // Match theme
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

      <motion.div 
        style={{ textAlign: 'center', marginBottom: '40px', zIndex: 10 }}
        variants={scaleUp}
      >
        <p style={{ 
          fontSize: '1.8rem', 
          color: '#fff', 
          marginTop: '10px',
          fontFamily: "'Dancing Script', cursive" 
        }}>
          Happy Birthday, Tiara Ayuwandira.
        </p>
      </motion.div>

      {/* Scattered Photo Stack Container */}
      <div style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {photos.map((src, index) => {
          const pos = stackPositions[index];
          return (
            <motion.div
              key={index}
              drag
              dragConstraints={{ left: -300, right: 300, top: -250, bottom: 250 }}
              style={{
                position: 'absolute',
                width: '90px',
                height: '120px', // 3:4 aspect ratio
                background: 'linear-gradient(135deg, #ffffff 0%, #ffe4e1 100%)', // brighter metallic/pearl white
                padding: '6px',
                paddingBottom: '25px', // Polaroid effect
                borderRadius: '8px',
                border: '2px solid #ff1493', // Deep/bright metallic pink
                boxShadow: '0 5px 15px rgba(0,0,0,0.5), 0 0 15px #ff69b4, inset 0 0 12px #ffffff', // Static bright shimmer glow
                cursor: 'grab',
                zIndex: index // initial stacking order
              }}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y, rotate: pos.rotate }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.05, // Staggered drop effect
                type: 'spring',
                bounce: 0.4
              }}
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}
              onDragStart={(e, info) => {
                // When dragged, bring to the front
                e.target.style.zIndex = 100;
              }}
            >
              <img src={src} alt="Memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          );
        })}
      </div>

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

export default FinalSurprise;
