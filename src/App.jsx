import { AudioPlayer } from './AudioPlayer'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import './App.css'


const generateButtons = (totalSize) => {
  return Array.from({ length: totalSize }, (_, i) => {
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

function App({delayMoles=1800, delayMoleSpawn=300, columnMoles=3, rowMoles=3}) {
  
  //delayMoles+=delayMoleSpawn;//Le agregamos el tiempo que los topos tardan en aparecer y desaparecer
  delayMoleSpawn /= 1000 //Pasamos de ms a s

  const totalMoles = columnMoles*rowMoles;

  const {audioRef, setVolume} = AudioPlayer();
  
  const [index, setIndex] = useState(0);

  const [currentButtons, setCurrentButtons] = useState(generateButtons(totalMoles));

  const width = '150px'; //TODO esto debe ser reactivo
  //50 es el minimo legible

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentButtons(generateButtons(totalMoles));
    }, delayMoles);     

    return () => clearInterval(interval);
  }, [delayMoles]);

  return <div>
    <audio ref={audioRef} src="./BadApple.mp3" />
    <div style={{
      display:'grid',
      gridTemplateColumns:'repeat(' + columnMoles + ', ' + width + ')',
      gap:'10px'
    }}
    >
      <AnimatePresence mode='sync'>
        {currentButtons.map((btn, i) => {
          let mole = 0;
          
          if(btn.text >= 0){
            mole = <motion.img key={btn.id}
            src={'./img/numberedMoles/Mole_' + btn.text + '.webp'}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: delayMoleSpawn }}
            onClick={()=>setVolume(btn.text/100)} 
            style={{gridArea:'1/1', zIndex:2, width:width}}/>
            //TODO decidir si prehacer todos los posibles topos (queda con python)
            //o 'dibujarlos' en tiempo de ejecución
          }else{
            mole = <div/>
          }
          return <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: width, // TODO hacerlo reactivo
            gridTemplateRows: width,    // TODO hacerlo reactivo
          }}>
            <img src="./img/DirtFG.png" style={{gridArea:'1/1', zIndex:1, width:width}}/>
            {mole}
            <img src='./img/DirtBG.png'style={{gridArea:'1/1', zIndex:3, width:width, pointerEvents:'none'}}/>
          </div>
      })}
      </AnimatePresence>
    </div>
  </div>
}

export default App
