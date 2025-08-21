import { useState } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';

export default function App() {
  const [categoria, setCategoria] = useState(localStorage.getItem('categoria') || 'misc');
  const [upWindow, setUpWindow] = useState(false);
  const [nova, setNova] = useState(false);

  return (
    <div>
      <Mansonry category={categoria} upWindow={upWindow} setUpWindow={setUpWindow} setNova={setNova}/>
      <footer className="text-left text-gray-700 dark:text-gray-400 pt-20 text-sm pl-2 z-0 max-w-[300px] absolute bottom-0 left-0">
        desenvolvido com react, supabase, tailwind

        <div className="flex gap-4 text-gray-400 z-50 justify-start relative lowercase">
          <a className="hover:text-gray-50 duration-100" href="https://github.com/brunofranciscojs">GITHUB</a>
          <a className="hover:text-gray-50 duration-100" href="https://brunofrancisco.com.br">WEBSITE</a>
          <a className="hover:text-gray-50 duration-100" href="https://linkedin.com/in/bruno-francisco-">LINKEDIN</a>
        </div>

      </footer>
      <Nav setCategoria={setCategoria} setUpWindow={setUpWindow} upWindow={upWindow} nova={nova} setNova={setNova}/>
    </div>
  );
}
