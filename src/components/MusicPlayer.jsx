import { useState, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { bgMusic } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(!bgMusic.paused);

  useEffect(() => {
    // Sinkronisasi status dari audio element
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    bgMusic.addEventListener('play', handlePlay);
    bgMusic.addEventListener('pause', handlePause);
    
    // Periksa status saat ini
    setIsPlaying(!bgMusic.paused);

    return () => {
      bgMusic.removeEventListener('play', handlePlay);
      bgMusic.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggle = () => {
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(e => console.log('Autoplay blocked:', e));
    }
  };

  return (
    <button 
      onClick={toggle}
      title={isPlaying ? "Pause Music" : "Play Music"}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px', // Pindah ke pojok kiri atas
        zIndex: 9999, // Selalu di atas segalanya
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        color: '#ff1493', // Warna ikon pink
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
      }}
    >
      {isPlaying ? <Pause size={24} /> : <Music size={24} />}
    </button>
  );
}
