import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import { Star } from 'lucide-react';

const FinalMessageCard = ({ onReset }) => {
  const [clickedStars, setClickedStars] = useState([]);
  const [showPath, setShowPath] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const messages = [
    "Happy Birthday, my love 🤍",
    "I wish you happiness, good health, success, and endless blessings in this new chapter of your life. May all your dreams come true, your days be filled with joy, and your heart always find peace. Thank you for being such a wonderful part of my life. I hope this year brings you everything you’ve been wishing for.",
    "Stay happy, stay healthy, and keep shining. I love you always. 🤍"
  ];

  const targetStars = [
    { id: 1, top: '20%', left: '20%' }, // Kiri atas
    { id: 2, top: '20%', left: '80%' }, // Kanan atas
    { id: 3, top: '70%', left: '50%' }  // Bawah tengah
  ];

  // Generate random names and sparkles for the message background
  const decorations = useMemo(() => {
    const names = Array.from({ length: 15 }).map((_, i) => ({
      id: `final-msg-name-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 1,
      opacity: Math.random() * 0.2 + 0.05,
      blur: Math.random() * 3 + 1
    }));

    const sparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: `final-msg-sparkle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      size: Math.random() * 4 + 2,
    }));
    
    const nightStars = Array.from({ length: 100 }).map((_, i) => ({
      id: `night-star-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 1
    }));

    return { names, sparkles, nightStars };
  }, []);

  const handleStarClick = (id) => {
    if (!clickedStars.includes(id)) {
      const newStars = [...clickedStars, id];
      setClickedStars(newStars);
      
      if (newStars.length === 3) {
        setTimeout(() => setShowPath(true), 500);
        setTimeout(() => setIsUnlocked(true), 4000); // Tunggu animasi garis selesai
      }
    }
  };

  // SVG Path untuk bentuk hati (melewati titik 20,20 - 80,20 - 50,70)
  const heartPath = "M 50 70 C 20 50, -10 30, 20 20 C 40 10, 50 30, 50 30 C 50 30, 60 10, 80 20 C 110 30, 80 50, 50 70";

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden' }}>
      
      {/* ================= FASE 1: RASI BINTANG (CONSTELLATION) ================= */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            key="constellation-phase"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }} // Fade out pelan-pelan
            style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 50, background: 'linear-gradient(to bottom, #020111 0%, #20124d 100%)' }}
          >
            {/* Teks Instruksi */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: '10%',
                width: '100%',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1.2rem',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '2px',
                zIndex: 10
              }}
            >
              {clickedStars.length < 3 ? "Klik 3 bintang yang paling terang..." : "Sebuah keajaiban..."}
            </motion.p>

            {/* Bintang Latar Belakang (Langit Malam) */}
            {decorations.nightStars.map(star => (
              <motion.div
                key={star.id}
                style={{
                  position: 'absolute',
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  opacity: 0.3
                }}
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
              />
            ))}

            {/* 3 Bintang Target */}
            {targetStars.map((star, index) => {
              const isClicked = clickedStars.includes(star.id);
              return (
                <motion.div
                  key={star.id}
                  onClick={() => handleStarClick(star.id)}
                  style={{
                    position: 'absolute',
                    left: star.left,
                    top: star.top,
                    width: '60px', // Hit box yang lebih besar
                    height: '60px',
                    transform: 'translate(-50%, -50%)', // Center the hit box
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 20
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  {/* Bintang visual sesungguhnya (Bukan sekedar titik) */}
                  <motion.div
                    style={{
                      color: isClicked ? '#ff69b4' : '#fff',
                      filter: isClicked 
                        ? 'drop-shadow(0 0 15px rgba(255,105,180,1))' 
                        : 'drop-shadow(0 0 10px rgba(255,255,255,0.8))'
                    }}
                    animate={{
                      scale: isClicked ? [1, 1.2, 1] : [1, 1.3, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Star 
                      size={32} 
                      fill={isClicked ? "#ff69b4" : "#ffffff"} 
                      strokeWidth={1} 
                    />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Animasi Garis Hati */}
            {showPath && (
              <svg 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none" // Biar persentase koordinat pas dengan layar
              >
                <motion.path
                  d={heartPath}
                  fill="transparent"
                  stroke="#ff69b4"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0px 0px 5px rgba(255,105,180,1))' }}
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= FASE 2: PESAN CINTA TERAKHIR ================= */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div 
            key="message-phase"
            className="full-screen flex-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: '#0a0a0a',
              flexDirection: 'column',
              padding: '20px',
              zIndex: 10
            }}
          >
            {/* Background image diputar ke landscape (16:9) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vh', // Tukar width dan height untuk kompensasi rotate 90deg
              height: '100vw',
              transform: 'translate(-50%, -50%) rotate(90deg)',
              background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("/photos/backgroundbook.jpg") center center / cover no-repeat',
              zIndex: 0
            }} />

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
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 2 + Math.random() * 2, delay: sparkle.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {/* Floating Names */}
            {decorations.names.map(name => (
              <motion.div
                key={name.id}
                style={{
                  position: 'absolute',
                  left: name.left,
                  top: name.top,
                  fontSize: `${name.size}rem`,
                  color: 'var(--primary-pink)',
                  opacity: name.opacity,
                  filter: `blur(${name.blur}px)`,
                  fontFamily: "'Dancing Script', cursive",
                  zIndex: 0,
                  whiteSpace: 'nowrap'
                }}
                animate={{ y: ["0%", "-100%", "0%"], x: ["0%", "10%", "0%"], rotate: [-5, 5, -5] }}
                transition={{ duration: 15 + name.delay, repeat: Infinity, ease: "linear" }}
              >
                Tiara Ayuwandira
              </motion.div>
            ))}

            <motion.h2 
              variants={fadeIn}
              style={{
                color: 'var(--primary-pink)',
                fontSize: '3rem',
                marginBottom: '20px',
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 20px rgba(233, 30, 99, 0.4)',
                zIndex: 10
              }}
            >
              Birthday Wishes
            </motion.h2>

            <motion.div 
              variants={fadeIn}
              style={{
                width: '100%',
                maxWidth: '900px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderTop: '3px solid var(--primary-pink)',
                borderBottom: '3px solid var(--primary-pink)',
                padding: '30px 40px',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10,
                position: 'relative'
              }}
            >
              {/* Decorative corner elements */}
              <div style={{ position: 'absolute', top: '15px', left: '15px', borderTop: '2px solid var(--primary-pink)', borderLeft: '2px solid var(--primary-pink)', width: '30px', height: '30px', opacity: 0.5 }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', borderTop: '2px solid var(--primary-pink)', borderRight: '2px solid var(--primary-pink)', width: '30px', height: '30px', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', borderBottom: '2px solid var(--primary-pink)', borderLeft: '2px solid var(--primary-pink)', width: '30px', height: '30px', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', borderBottom: '2px solid var(--primary-pink)', borderRight: '2px solid var(--primary-pink)', width: '30px', height: '30px', opacity: 0.5 }} />

              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px', 
                zIndex: 1, 
                position: 'relative',
                maxHeight: '350px',
                overflowY: 'auto',
                paddingRight: '15px'
              }}>
                {messages.map((msg, index) => {
                  const characters = msg.split('');
                  return (
                    <motion.p
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 1 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.015, delayChildren: index * 0.5 }
                        }
                      }}
                      style={{
                        fontSize: index === 0 || index === messages.length - 1 ? '1.5rem' : '1.1rem',
                        color: '#ffffff',
                        lineHeight: '1.6',
                        fontFamily: index === 0 || index === messages.length - 1 ? "'Dancing Script', cursive" : "'Outfit', sans-serif",
                        margin: 0,
                        textShadow: '2px 2px 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {characters.map((char, charIndex) => (
                        <motion.span key={charIndex} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                          {char}
                        </motion.span>
                      ))}
                    </motion.p>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{ marginTop: '30px' }}
              >
                <button className="btn-primary" onClick={onReset}>
                  Back to Home
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FinalMessageCard;
