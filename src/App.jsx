import { AudioPlayer } from './AudioPlayer'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import './App.css'


const generateButtons = () => {
  return Array.from({ length: 9 }, (_, i) => {
    return {
      id: crypto.randomUUID(), // id único
      text: Math.floor(Math.random() * 401) - 300,
      //Generamos numeros aleatorios del -300 a 100
      //los numeros debajo de 0 serán topos que no saldrán
      //los positivos serán el nuevo volumen
      //Así tendremos una probabilidad discreta del 25%
      //de que cada agujero tenga un topo
    };
  });
};

function App({delayMoles=1800, delayMoleSpawn=300}) {
  
  //delayMoles+=delayMoleSpawn;//Le agregamos el tiempo que los topos tardan en aparecer y desaparecer
  delayMoleSpawn /= 1000 //Pasamos de ms a s

  const {audioRef, setVolume} = AudioPlayer();
  
  const [index, setIndex] = useState(0);

  const [currentButtons, setCurrentButtons] = useState(generateButtons());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentButtons(generateButtons());
    }, delayMoles);     

    return () => clearInterval(interval);
  }, [delayMoles]);

  return <div>
    <audio ref={audioRef} src="/BadApple.mp3" />
    <div className="moles">
      <AnimatePresence mode='wait'>
        {currentButtons.map((btn, i) => {
          if(btn.text < 0){
            return <button key={btn.id} onClick={()=>null}>
              Lol
            </button>
          }else{
            return <motion.button key={btn.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: delayMoleSpawn }}
            onClick={()=>setVolume(btn.text/100)}>
              {btn.text}
            </motion.button>
          }
      })}
      </AnimatePresence>
    </div>
  </div>
}

export default App
