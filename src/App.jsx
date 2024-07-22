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
      <div className='presentation duration-200 transition-all bg-[#e5e5e5] relative overflow-hidden z-0 my-[70px] max-w-[1100px] mx-auto sm:py-7 sm:px-16 text-left rounded-3xl flex bg-[length:100%,50%] px-8 py-8'>

        <div className="z-10 relative">
          <span className="text-gray-700 dark:text-gray-200">BRUNO FRANCISCO</span>
          <h1 className="font-bold text-gray-700 dark:text-gray-100 leading-none m-0 w-full text-[clamp(1rem,_0.284rem_+_3.9506vw,_3rem)]">Estudos de ilustras e rabiscos.</h1>
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
