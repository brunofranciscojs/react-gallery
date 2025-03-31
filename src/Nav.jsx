import React, { useEffect, useState } from "react";
import { supabase } from './contexto/supabaseClient'; 
import './Nav.css';
import useAuth from "./hooks/useAuth.jsx";
import Logar from "./login.jsx";
import UploadForm from "./components/UploadImage.jsx";

export default function Nav({setCategoria}) {
    const { logado, sair } = useAuth();
    const [ upWindow, setupWindow ] = useState(false)
    const dcolor = localStorage.getItem('dColor')
    const [categories, setCategories] = useState([]);
    const [logar, setLogar] = useState(false)
    
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
        <>  {logado && upWindow && <UploadForm setupWindow={setupWindow}/>}
            {logado && <span className='log fixed right-12 top-[14px] text-gray-600 hover:text-gray-950 cursor-pointer z-50 hidden sm:block' onClick={sair}>sair</span>}
            {logado && <button className='log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-30 text-2xl hidden sm:block' onClick={() => setupWindow(true)}> + </button>}
            {!logado &&
                <span className='flex flex-row add items-center absolute top-0 right-6'>
                    <button className='log text-2xl cursor-pointer text-gray-700 z-50 relative top-2' onClick={() => { setLogar(true) }}> + </button>
                    {logar && <>
                        <button className='log text-2xl cursor-pointer text-gray-700 z-50 absolute md:top-[4rem] md:-left-[21rem] top-[6px] -left-1 backdrop-blur px-2' 
                                onClick={() => {setLogar(false)}}>
                                    x
                        </button>
                        <Logar />
                        </>
                    }
                </span>
            }
            <nav>
                <ul key='categorias' className="items-start md:items-center justify-center z-50 relative md:w-fit w-full md:mx-auto mx-0 bg-white md:bg-transparent">
                <div className="absolute w-[80%] h-12 shadow-xl blur-xl bg-[--dColor] -top-6 z-0 saturate-200 left-1/2 -translate-x-1/2 hidden md:block" ></div>
                    {categories.map((table, index) => (
                        <li key={index} className={`${table.toLowerCase() === categories ? 'active' : ''} md:text-base text-sm text-gray-700 bg-white py-1.5 sm:py-3 px-2 sm:px-5 [&:first-of-type]:rounded-[1rem_0_0_1rem] [&:last-of-type]:rounded-[0_1rem_1rem_0]`}  
                            onClick={() => setCategoria(table.toLowerCase())}>
                            {table}
                        </li>
                     ))}
                </ul>
            </nav>
        </>
    )
}