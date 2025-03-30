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
            {logado && <span className='log fixed right-12 top-[14px] text-gray-600 hover:text-gray-950 cursor-pointer z-50 hidden sm:block' onClick={sair}>sair</span>}
            {logado && <button className='log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-30 text-2xl hidden sm:block' onClick={() => { setupWindow(true) }}> + </button>}
            <nav>
                <ul key='categorias' className="items-start md:items-center justify-center z-50 relative md:w-fit w-full md:mx-auto mx-0 bg-white md:bg-transparent">
                <div className="absolute w-[80%] h-12 shadow-xl blur-xl bg-[--dColor] -top-6 z-0 saturate-200 left-1/2 -translate-x-1/2 hidden md:block" style={{'--dColor':dcolor}}></div>
                    {nav.map((litem) => (
                        <li key={litem} className={`md:text-base text-sm ${litem.split(' ').join('')} ${litem.toLowerCase() === categoria ? 'active' : ''}  text-gray-700 bg-white py-1.5 sm:py-3 px-2 sm:px-5 [&:first-of-type]:rounded-[1rem_0_0_1rem] [&:last-of-type]:rounded-[0_1rem_1rem_0]`}  
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