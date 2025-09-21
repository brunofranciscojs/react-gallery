import React, { useEffect, useState } from "react";
import { supabase } from './contexto/supabaseClient'; 
import './Nav.css';
import useAuth from "./hooks/useAuth.jsx";
import Logar from "./login.jsx";
import UploadForm from "./components/UploadImage.jsx";
import { useNavigate } from 'react-router-dom';

export default function Nav({ setCategoria, upWindow, setUpWindow, nova, setNova }) {
  const { logado, sair } = useAuth();
  const [categories, setCategories] = useState([]);
  const [logar, setLogar] = useState(false);
  const [ativo, setAtivo] = useState(localStorage.getItem('categoria') || 'misc');
  const navigate = useNavigate();
  const glassFilter = `data:image/png;base64,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`

  const slugify = (text) =>{
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('imagens').select("categoria", { distinct: true });
        if (error) throw error;
        const uniqueCategories = [...new Set(data.map(item => item.categoria))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategoria(newCategory);
    localStorage.setItem('categoria', slugify(newCategory));
    navigate(`/${slugify(newCategory)}`);
  };

  return (
    <>
        {logado && upWindow && <UploadForm setUpWindow={setUpWindow} nova={nova}/>}
        {logado && (
          <>
            <span className='log fixed right-12 top-[14px] text-gray-600 hover:text-gray-950 cursor-pointer z-50 hidden sm:block' onClick={sair}>sair</span>
            <button className='log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-30 text-2xl hidden sm:block' onClick={() => {setUpWindow(true); setNova(false)}}> + </button>
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
          <svg style={{display:'none'}}>
              <filter id="displacementFilter">
                  <feImage href={glassFilter}></feImage>
                  <feDisplacementMap in="SourceGraphic" scale="100" xChannelSelector="R" yChannelSelector="B" />
              </filter>
          </svg>

          <svg style={{display:'none'}}>
            <defs>
              <filter id="blurMe">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>
          </svg>

            <div className="w-full h-[3.2rem] rounded-full absolute left-1/2 -translate-x-1/2 bottom-[0] z-[9] [backdrop-filter:url(#blurMe)]"></div>
            
            <ul className="rounded-full items-start md:items-center justify-center z-10 relative xl:w-fit w-[90svw] mx-auto [&_li.active]:text-white
                           [backdrop-filter:url(#displacementFilter)] shadow-[inset_1px_1px_6px_#0004,inset_-2px_-2px_6px_#fffa,0_20px_40px_#0005] mt-3 ml-3 bg-[#0003]">

              {categories.map((table, index) => (
                <li key={index} 
                  className={
                    `${table.toLowerCase() === ativo ? 'active' : ''} 
                      md:text-lg text-[.7rem] font-[400] text-white/90 py-1 sm:py-3 px-2 sm:px-5 hover:text-white hover:[text-shadow:0_0_10px_white] uppercase`}
                      onClick={() => {
                        handleCategoryChange(table.toLowerCase());
                        setAtivo(table);
                      }}>
                  {table}
                </li>
              ))}
            </ul>
        </nav>
    </>
  );
}
