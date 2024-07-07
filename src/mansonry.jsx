import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { images } from './firebaseData.jsx';
import './mansonry.css';
import Palette from 'react-palette';
import { useCategoria } from "./Context";

export default function Mansonry() {
    const [files, setFiles] = useState([]);
    const [modal, setModal] = useState(false)
    const [modalImage, setModalImage] = useState('')
    const { categoria } = useCategoria();

    useEffect(() => {
        const fetchUrls = async () => {
            const root = await listAll(ref(images, '/'));
            const pastas = root.prefixes.map((folderRef) => folderRef);

            const fetch = pastas.map(async (folderRef) => {
                const pasta = ref(images, folderRef.fullPath);
                const arquivos = await listAll(pasta);
                const urls = await Promise.all(arquivos.items.map((itemRef) => getDownloadURL(itemRef)));
                return { cat: folderRef._location.path_, img: urls };
            });
            const allFiles = await Promise.all(fetch);
            setFiles(allFiles);
        };
        fetchUrls();
    }, []);

    document.onkeydown = (event) => event.code === 'Escape' ?  setModal(false) : ''

    const filtrar = files.filter(file => categoria === 'todos' || file.cat.toLowerCase() === categoria);

    return (
        <div className='mansonry' key='mansonry'>
            {filtrar.map((pastinha) => {
                    return (
                        <span key={pastinha.cat} className="placeholder">
                            {
                                pastinha.img.map((url, index) => (
                                    <figure key={index} className={`item ${pastinha.cat.toLowerCase()}`} >
                                        <Palette src={url}>
                                            {({ data }) => (
                                                
                                                <img loading="lazy" src={url} 
                                                     className="figure" 
                                                     onClick={(e) => {setModal(true), setModalImage(e.target.src)}}
                                                     style={{ color: data.lightMuted }} 
                                                     data-cor={data.darkVibrant} 
                                                     alt={pastinha.cat}
                                                     onLoad={(e) => {
                                                        e.target.parentNode.parentNode.classList.remove('placeholder') 
                                                        e.target.style.opacity = '1'}
                                                    }
                                                     />
                                            )}
                                        </Palette>
                                        <figcaption>{pastinha.cat}</figcaption>
                                    </figure>
                                ))
                            }
                        </span>
                    )
                })
            }
            {modal && (
                <div className="modal">
                    <button onClick={() => setModal(false)}>X</button>
                    <img src={modalImage} alt="Modal Content"/>
                </div>
            )}
    </div>
    );
}
