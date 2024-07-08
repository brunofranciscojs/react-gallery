import { listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import './Nav.css';
import Upload from './addImage';
import { images } from './firebaseData.jsx';
import { useCategoria } from "./Context.jsx";


export default function Nav() {
    const [nav, setNav] = useState([])
    const { setCategoria, categoria } = useCategoria();

    useEffect(() => {
    const fetchCts = async () => {
        const navItens = await listAll(ref(images, '/'));
        const li = navItens.prefixes.map((folderRef) => folderRef.fullPath);
        setNav(li.reverse());
    }
    fetchCts()
    }, [])


    return (
        <nav>
            <ul key='categorias' className="items-start md:items-center justify-center py-4 px-14">
                {nav.map((litem) => (
                    <li key={litem} className={`${litem.split(' ').join('')} ${litem.toLowerCase() === categoria ? 'active' : ''}`}  
                        onClick={() => setCategoria(litem.toLowerCase())}>
                        {litem.toLowerCase()}
                    </li>
                 ))}
            </ul>
            <Upload />    
        </nav>
    )
}