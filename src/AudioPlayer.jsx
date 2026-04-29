import { useEffect, useRef } from 'react';

export function AudioPlayer(){
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;

    const playAudio = () => {
      audio.play();
    };

    // Reproducir después de interacción del usuario (viva el bloqueo de autoplay)
    window.addEventListener("click", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
    };
  }, []);

  const setVolume = (value) => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = value;
  };

  return {audioRef, setVolume};
}