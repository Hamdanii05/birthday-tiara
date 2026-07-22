import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { fadeIn, scaleUp } from '../utils/animations';

// Page Component must use forwardRef for react-pageflip
const Page = React.forwardRef((props, ref) => {
  return (
    <div className={`page ${props.className || ''}`} ref={ref} {...props} style={{
      background: 'transparent',
      ...props.style // Crucial for react-pageflip to apply internal transforms
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        borderRadius: '8px', // Guaranteed rounded corners
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {props.children}
      </div>
    </div>
  );
});

const Flipbook = ({ onNext }) => {
  const bookRef = useRef();
  const [burstButterflies, setBurstButterflies] = useState([]);

  const handleFlip = (e) => {
    // e.data contains the new page index. Index 1 means we just opened the cover.
    if (e.data === 1) {
      const burst = Array.from({ length: 25 }).map((_, i) => ({
        id: `burst-${Date.now()}-${i}`,
        left: '50%',
        top: '60%', // Start from the center/bottom of the book
        xTarget: (Math.random() - 0.5) * 120 + 'vw', // spread horizontally
        yTarget: - (Math.random() * 80 + 40) + 'vh', // fly up
        delay: Math.random() * 0.5, // staggered launch
        duration: Math.random() * 4 + 3, // 3 to 7 seconds
        size: Math.random() * 1.5 + 1 // 1rem to 2.5rem
      }));
      setBurstButterflies(burst);
      
      // Bersihkan state setelah kupu-kupu selesai terbang
      setTimeout(() => setBurstButterflies([]), 8000);
    }
  };

  const pages = [
    { image: "/photos/fotobuku2.jpeg" },
    { image: "/photos/fotobuku3.jpeg" },
    { image: "/photos/fotobuku4.jpeg" },
    { image: "/photos/fotobuku5.jpeg" },
    { image: "/photos/fotobuku6.jpeg" },
    { image: "/photos/fotobuku7.jpeg" },
    { image: "/photos/fotobuku8.jpeg" },
    { image: "/photos/fotobuku9.jpeg" }
  ];

  // Background decorations
  const decorations = useMemo(() => {
    const hearts = Array.from({ length: 20 }).map((_, i) => ({
      id: `fb-heart-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 25 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      blur: Math.random() * 4 + 2
    }));

    const sparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: `fb-sparkle-${i}`,
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

      {/* Bursting Butterflies on Open */}
      {burstButterflies.map(b => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            x: b.xTarget, 
            y: b.yTarget, 
            scale: [0, 1.5, 1],
            rotate: [0, 45, -45, 30, -30, 0] // efek kepak sayap
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            left: b.left,
            top: b.top,
            fontSize: `${b.size}rem`,
            zIndex: 50,
            pointerEvents: 'none', // agar tidak menghalangi klik buku
            filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.3))'
          }}
        >
          🦋
        </motion.div>
      ))}

      <motion.div 
        style={{ zIndex: 10, textAlign: 'center', marginBottom: '30px' }}
        variants={scaleUp}
      >
        <h2 style={{ 
          color: 'var(--primary-pink)', 
          margin: 0, 
          fontSize: '3rem',
          fontFamily: "'Playfair Display', serif",
          textShadow: '0 0 15px rgba(233, 30, 99, 0.4)'
        }}>
          Our Memories
        </h2>
      </motion.div>

      <motion.div 
        variants={scaleUp} 
        style={{ 
          zIndex: 10, 
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          width: '100%',
          maxWidth: '600px', // width of two pages (300px * 2)
          height: '450px',
          maxHeight: '70vh',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <HTMLFlipBook 
          width={300} 
          height={450} 
          size="fixed"
          style={{ margin: '0 auto', borderRadius: '15px' }}
          minWidth={200}
          maxWidth={300}
          minHeight={300}
          maxHeight={450}
          maxShadowOpacity={0.8}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={1200}
          onFlip={handleFlip}
          ref={bookRef}
        >
          {/* Cover Page */}
          <Page>
            <div style={{
              width: '100%', 
              height: '100%', 
              background: 'url("/photos/backgroundbook.jpg") center center / cover no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              <h1 style={{ 
                fontFamily: "'Dancing Script', cursive", 
                fontSize: '2.2rem', // Ukuran diperkecil
                color: '#db7093', // Warna pink kalem/pastel (Rose/PaleVioletRed) agar lebih menyatu
                margin: 0,
                textAlign: 'center',
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)' // Bayangan gelap tipis agar tetap terbaca tanpa terlihat norak
              }}>
                Tiara Ayuwandira
              </h1>
            </div>
          </Page>

          {/* Photo Pages */}
          {pages.map((page, index) => (
            <Page key={index}>
              <div style={{ flex: 1, padding: '5px', background: '#fff', display: 'flex' }}>
                <img 
                  src={page.image} 
                  alt={`Memory ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            </Page>
          ))}

          {/* Back Cover */}
          <Page>
            <div style={{
              width: '100%', 
              height: '100%', 
              background: 'url("/photos/backgroundakhir.jpg") center center / cover no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end', // Place button near the bottom
              alignItems: 'center',
              paddingBottom: '40px' // Add some spacing from the bottom edge
            }}>
              <button 
                onClick={onNext}
                style={{
                  padding: '12px 30px',
                  background: 'rgba(219, 112, 147, 0.8)', // Matching #db7093 (PaleVioletRed)
                  border: '2px solid #db7093',
                  borderRadius: '25px',
                  color: '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  backdropFilter: 'blur(5px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}
              >
                Ada Kejutan Lagi!
              </button>
            </div>
          </Page>
        </HTMLFlipBook>
      </motion.div>

    </motion.div>
  );
};

export default Flipbook;
