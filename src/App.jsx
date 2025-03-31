import { useState } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';
import '@splidejs/react-splide/css';

export default function App() {
  const [categoria, setCategoria] = useState('jogos')

  return (
    <div className="px-4">
      <Nav setCategoria={setCategoria}/>
      <div className='presentation duration-200 transition-all relative overflow-hidden my-[70px] max-w-[1100px] mx-auto sm:py-7 sm:px-16 text-left rounded-3xl flex bg-[length:100%,50%] px-8 py-8 z-0'>
        <div className="relative z-10">
          <span className="text-gray-700 text-3xl font-['Highland_Jakarta'] tracking-[1rem]">BRUNO FRANCISCO</span>
          <h1 className="text-white font-['Highland_Jakarta'] leading-none text-[clamp(2rem,_0.284rem_+_3.9506vw,_5rem)] mt-2 [-webkit-text-stroke:1px_#444] ">
            Ilustras e rabiscos.
          </h1>
        </div>
      
      </div>

      <Mansonry category={categoria} />

      <footer className="text-center text-gray-700 dark:text-gray-400 pt-20 text-sm">
        desenvolvido com react, supabase, tailwind

        <div className="flex gap-4 text-gray-400 z-50 justify-center relative lowercase ">
          <a className="hover:text-gray-50 duration-100" href="https://github.com/brunofranciscojs">GITHUB</a>
          <a className="hover:text-gray-50 duration-100" href="https://brunofrancisco.com.br">WEBSITE</a>
          <a className="hover:text-gray-50 duration-100" href="https://linkedin.com/in/bruno-francisco-">LINKEDIN</a>
        </div>

      </footer>
    </div>
  );
}
