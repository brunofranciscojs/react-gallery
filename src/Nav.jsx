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
    const [upWindow, setupWindow] = useState(false)

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
            {logado && <span className='log fixed left-3 top-[14px] text-gray-600 hover:text-gray-950 cursor-pointer z-[999]' onClick={sair}>sair</span>}
            {logado && <button className='log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-[999] text-2xl' onClick={() => { setupWindow(true) }}> + </button>}
            <nav>
                <ul key='categorias' className="items-start md:items-center justify-center py-4 px-14">
                    {nav.map((litem) => (
                        <li key={litem} className={`${litem.split(' ').join('')} ${litem.toLowerCase() === categoria ? 'active' : ''}`}  
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