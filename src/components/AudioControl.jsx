import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/audioControl.module.scss';
import { VscMute } from "react-icons/vsc";
import { VscUnmute } from "react-icons/vsc";

const AudioControl = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sound.mp3');
      const audio = audioRef.current;
      audio.loop = true;

      if (isMuted) {
        audio.play().catch((error) => console.log(error));
      } else {
        audio.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={styles.audioControl}>
      <button onClick={toggleMute} className={styles.muteButton}>
        <span>{isMuted ? <VscUnmute /> : <VscMute />}</span>
      </button>
    </div>
  );
};

export default AudioControl;