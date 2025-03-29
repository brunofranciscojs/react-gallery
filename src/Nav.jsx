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
    const dcolor = localStorage.getItem('dColor')

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
                <div className="absolute w-full h-12 shadow-xl blur-xl bg-[--dColor] -top-4 left-0 z-0 saturate-200" style={{'--dColor':dcolor}}></div>
                <ul key='categorias' className="items-start md:items-center justify-center px-12 w-full z-50">
                    {nav.map((litem) => (
                        <li key={litem} className={`${litem.split(' ').join('')} ${litem.toLowerCase() === categoria ? 'active' : ''}  text-gray-700 bg-gray-50 py-3 px-5`}  
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