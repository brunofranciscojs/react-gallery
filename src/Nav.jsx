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
            <ul className="items-start md:items-center justify-center z-50 relative md:w-fit w-full mx-0 bg-[#efefefcc] backdrop-blur-md [&_li.active]:text-black" >
              {categories.map((table, index) => (
                <li key={index} className={`${table.toLowerCase() === ativo ? 'active' : ''} md:text-base text-[.7rem] text-black/40 py-1 sm:py-3 px-2 sm:px-5 hover:text-black uppercase`}
                  onClick={() => {
                    handleCategoryChange(table.toLowerCase());
                    setAtivo(table);
                  }}
                >
                  {table}
                </li>
              ))}
            </ul>
        </nav>
    </>
  );
}
