import { listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import './Nav.css';
import Upload from './addImage';
import { images } from './firebaseData.jsx';
import { useCategoria } from "./Context.jsx";
import useAuth from "./hooks/useAuth.jsx";

export default function Nav() {

    const [nav, setNav] = useState([])
    const { setCategoria, categoria } = useCategoria();
    const { logado, sair } = useAuth();
    const [ upWindow, setupWindow ] = useState(false)

    useEffect(() => {
    const fetchCts = async () => {
        const navItens = await listAll(ref(images, '/'));
        const li = navItens.prefixes.map((folderRef) => folderRef.fullPath);
        setNav(li.reverse());
    }
    fetchCts()
    }, [])
    
    return (
        <>
            {logado && <span className='log fixed right-12 md:top-[14px] top-10 text-gray-600 hover:text-gray-950 cursor-pointer z-50' onClick={sair}>sair</span>}
            {logado && <button className='log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-30 text-2xl' onClick={() => { setupWindow(true) }}> + </button>}
            <nav>
                <ul key='categorias' className="bg-white dark:bg-[#31313188] backdrop-blur-md items-start md:items-center justify-center mt-6 py-4 px-12 w-fit rounded-full z-50 [&:has(:not(li:hover))_li:hover]:opacity-100 [&:has(li:hover)_li]:opacity-45">
                    {nav.map((litem) => (
                        <li key={litem} className={`${litem.split(' ').join('')} ${litem.toLowerCase() === categoria ? 'active' : ''} dark:text-gray-300 text-gray-700 dark:before:bg-[#313131] before:bg-[#fff] dark:before:border-[#313131]`}  
                            onClick={() => setCategoria(litem.toLowerCase())}>
                            {litem.toLowerCase()}
                        </li>
                     ))}
                </ul>
                <Upload setupWindow={setupWindow} upWindow={upWindow}/>    
            </nav>
        </>
    )
}