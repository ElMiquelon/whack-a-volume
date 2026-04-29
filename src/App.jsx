import { AudioPlayer } from './AudioPlayer'
import { useState, useEffect } from 'react';
import './App.css'


const generateButtons = () => {
  return Array.from({ length: 9 }, (_, i) => {
    return {
      text: Math.floor(Math.random() * 401) - 300,
      //Generamos numeros aleatorios del -250 a 100
      //los numeros debajo de 0 serán topos que no saldrán
      //los positivos serán el nuevo volumen
      //Así tendremos una probabilidad discreta del 25%
      //de que cada agujero tenga un topo
    };
  });
};

function App() {
  const {audioRef, setVolume} = AudioPlayer();
  
  const [index, setIndex] = useState(0);

  const currentButtons = generateButtons();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return <div>
    <audio ref={audioRef} src="/BadApple.mp3" />
    <div className="moles">
      {currentButtons.map((btn, i) => {
        if(btn.text < 0){
          return <button key={i} onClick={()=>null}>
            Lol
          </button>
        }else{
          return <button key={i} onClick={()=>btn.text < 0 ?null:setVolume(btn.text/100)}>
            {btn.text}
          </button>
        }
      }
      )}
    </div>
  </div>
}

export default App
