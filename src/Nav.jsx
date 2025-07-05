import React, { useEffect, useState } from "react";
import { supabase } from './contexto/supabaseClient'; 
import './Nav.css';
import useAuth from "./hooks/useAuth.jsx";
import Logar from "./login.jsx";
import UploadForm from "./components/UploadImage.jsx";
import { GlassCard } from '@developer-hub/liquid-glass'

export default function Nav({ setCategoria }) {
  const { logado, sair } = useAuth();
  const [upWindow, setupWindow] = useState(false);
  const dcolor = localStorage.getItem('dColor');
  const [categories, setCategories] = useState([]);
  const [logar, setLogar] = useState(false);
  const [ativo, setAtivo] = useState('jogos');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('imagens')
          .select("categoria", { distinct: true });
        if (error) throw error;
        const uniqueCategories = [...new Set(data.map(item => item.categoria))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      
        {logado && upWindow && <UploadForm setupWindow={setupWindow} />}
        {logado && (
          <>
            <span className='log fixed right-12 top-[14px] text-gray-600 hover:text-gray-950 cursor-pointer z-50 hidden sm:block' onClick={sair}>sair</span>
            <button className='log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-30 text-2xl hidden sm:block' onClick={() => setupWindow(true)}> + </button>
          </>
        )}
        {!logado && (
          <div className='flex flex-row add items-center fixed top-0 right-8 z-50'>
            <button className='log text-2xl cursor-pointer text-gray-700 z-50 relative top-2' onClick={() => setLogar(true)}> + </button>
            {logar && (
              <>
                <button className='log text-2xl cursor-pointer text-gray-700 z-50 absolute lpt:top-[.45rem] md:-left-[21rem] top-[3.4rem] -left-1 backdrop-blur px-2' onClick={() => setLogar(false)}>x</button>
                <Logar />
              </>
            )}
          </div>
        )}

        <nav>
            <GlassCard
              displacementScale={700}
              blurAmount={0.0}
              cornerRadius={60}
              className="!w-full rounded-3xl mx-auto"
              width="100%"
              >
            <ul key='categorias' 
                className="border border-white/40 border-b-black/20 border-r-black/20 items-start md:items-center justify-center z-50 relative md:w-fit w-full md:mx-auto mx-0 backdrop-blur-sm shadow-2xl !rounded-full bg-black/35 
                           [&:has(li:hover)_li]:opacity-50 [&:has(li:not(:hover))_li:hover]:opacity-100" 
                           >
              {categories.map((table, index) => (
                <li
                  key={index}
                  className={`${table.toLowerCase() === ativo ? 'active' : ''} md:text-base text-sm text-white py-1.5 sm:py-3 px-2 sm:px-5 hover:[scale:1.2]`}
                  onClick={() => {
                    setCategoria(table.toLowerCase());
                    setAtivo(table);
                  }}
                >
                  {table}
                </li>
              ))}
            </ul>
            </GlassCard>
        </nav>
      
    </>
  );
}
