import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Countdown from './components/Countdown';
import GiftBox from './components/GiftBox';
import MainPage from './components/MainPage';
import MessageCard from './components/MessageCard';
import Flipbook from './components/Flipbook';
import FinalSurprise from './components/FinalSurprise';
import GalleryPage from './components/GalleryPage';
import FinalMessageCard from './components/FinalMessageCard';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [phase, setPhase] = useState(() => {
    return localStorage.getItem('appPhase') || 'countdown';
  });

  useEffect(() => {
    localStorage.setItem('appPhase', phase);
  }, [phase]);

  useEffect(() => {
    // Check date for phase 1 vs phase 2
    // Target: July 24, 2026
    const checkDate = () => {
      const targetDate = new Date('2026-07-24T00:00:00').getTime();
      const now = new Date().getTime();
      
      if (now < targetDate && phase === 'countdown') {
        // Still waiting
      } else if (now >= targetDate && phase === 'countdown') {
        setPhase('gift');
      }
    };

    checkDate();
    const interval = setInterval(checkDate, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="app-container">
      {/* Tombol Play/Pause Musik Global */}
      <MusicPlayer />
      
      <AnimatePresence mode="wait">
        {phase === 'countdown' && <Countdown key="countdown" onSkip={() => setPhase('gift')} />}
        {phase === 'gift' && <GiftBox key="gift" onOpen={() => setPhase('main')} />}
        {phase === 'main' && <MainPage key="main" onNext={() => setPhase('message')} />}
        {phase === 'message' && <MessageCard key="message" onNext={() => setPhase('flipbook')} />}
        {phase === 'flipbook' && <Flipbook key="flipbook" onNext={() => setPhase('final')} />}
        {phase === 'final' && <FinalSurprise key="final" onNext={() => setPhase('gallery')} />}
        {phase === 'gallery' && <GalleryPage key="gallery" onNext={() => setPhase('final_message')} />}
        {phase === 'final_message' && <FinalMessageCard key="final_message" onReset={() => setPhase('countdown')} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
