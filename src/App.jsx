import React, { useEffect, useState } from "react";
import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';

export default function App() {
  const [bg, setBg] = useState('');

  useEffect(() => {
    const fetchRandomBg = () => {
      const images = document.getElementsByClassName('bg');
      if(images.length > 0){

        const image = Math.floor(Math.random() * 100);
        const url = images[image].src;
        setBg(url);
      }
    };
    const timeoutId = setTimeout(fetchRandomBg, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="App">
      <Nav/>
      <div className='presentation duration-200 transition-all bg-auto bg-[#e5e5e5] flex relative overflow-hidden z-0'>

        <div className="z-10 relative">
          <span>BRUNO FRANCISCO</span>
          <h1 className="font-bold text-gray-200 leading-none">Estudos de ilustras e rabiscos.</h1>
        </div>

        <div style={{ backgroundImage: `linear-gradient(to right,currentColor, transparent), url(${bg})` }} 
             className="z-0 bg-cover w-[50%] h-full absolute right-0 top-0 bg-[center_20%] text-[#e5e5e5] dark:text-[#434343]">
        </div>
      </div>
      <Mansonry />
      <footer className="text-center text-gray-700 dark:text-gray-400 pt-20">
        Desenvolvido com React.JS, Firebase, TailwindCSS - Deployed no Vercel
      </footer>
    </div>
  );
}
