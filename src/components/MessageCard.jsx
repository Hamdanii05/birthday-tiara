import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, scaleUp } from '../utils/animations';

const MessageCard = ({ onNext }) => {
  const messages = [
    "happy birthday sweetheart 🤍",
    "selamat ulang tahun yaa cintaaa! hari ini hari yang spesial banget karena hari ini adalah hari lahir orang yang paling berarti di hidupku.",
    "terima kasih udah selalu ada, udah bikin hari-hariku lebih bahagia, dan udah menjadi alasan aku tersenyum setiap hari. aku bersyukur banget bisa kenal dan punya sayanggnaa acuu sampai sekarang.",
    "di umur yang baru ini, aku cuma mau doain semoga semua hal baik selalu datang ke hidup sayang. semoga sehat selalu, panjang umur, dimudahkan segala urusannya, dan semua impian sayang bisa tercapai satu per satu.",
    "tetap jadi pribadi yang kuat, baik, dan hebat seperti sekarang yaa. jangan lupa kalau aku selalu ada buat sayang dalam keadaan apa pun.",
    "sekali lagi, selamat ulang tahun sayangkuu. semoga hari ini penuh kebahagiaan dan tahun ini menjadi tahun terbaik untuk sayang.",
    "i love you, today, tomorrow, and always. 🤍"
  ];

  // Generate random names and sparkles for the background
  const decorations = useMemo(() => {
    const names = Array.from({ length: 15 }).map((_, i) => ({
      id: `msg-name-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 1, // 1rem to 2.5rem
      opacity: Math.random() * 0.2 + 0.05, // very subtle
      blur: Math.random() * 3 + 1
    }));

    const sparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: `msg-sparkle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      size: Math.random() * 4 + 2,
    }));

    return { names, sparkles };
  }, []);

  return (
    <motion.div 
      className="full-screen flex-center"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        backgroundColor: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        padding: '20px',
        flexDirection: 'column'
      }}
    >
      {/* Background image diputar ke landscape (16:9) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100vh',
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
          animate={{
            y: ["0%", "-100%", "0%"],
            x: ["0%", "10%", "0%"],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 15 + name.delay,
            repeat: Infinity,
            ease: "linear"
          }}
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
        Happy Birthday
      </motion.h2>

      <motion.div 
        variants={fadeIn}
        style={{
          width: '100%',
          maxWidth: '900px',
          background: 'rgba(255, 255, 255, 0.1)', // Kaca bening terang, bukan hitam
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
          paddingRight: '15px' // Memberi ruang agar teks tidak tertutup scrollbar
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
                    transition: { 
                      staggerChildren: 0.015, // Kecepatan ngetik per huruf sangat cepat (15ms)
                      delayChildren: index * 0.5 // Jeda mulainya tiap paragraf hanya setengah detik
                    }
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
                  <motion.span
                    key={charIndex}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                  >
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
          transition={{ delay: 1.5, duration: 1 }} // Tombol muncul tak lama setelah teks selesai
          style={{ marginTop: '30px' }}
        >
          <button 
            className="btn-primary" 
            onClick={onNext}
          >
            Open Our Memories
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MessageCard;
