import React, { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref, getMetadata, deleteObject } from "firebase/storage";
import { images } from './firebaseData.jsx';
import { FastAverageColor } from 'fast-average-color';
import { useCategoria } from "./Context.jsx";
import './mansonry.css';
import useAuth from './hooks/useAuth.jsx'
import Modal from './components/Modal.jsx';
import Favorites from './components/Favorites.jsx';
import Figure from './components/Figure.jsx';

const Mansonry = () => {
    const deletar = `<svg width="20px" height="20px" viewBox="0 0 24 24"> <path d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909" stroke="#1C1C1C" stroke-width="1.7" stroke-linecap="round"/> <path d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6" stroke-width="2" stroke-linecap="round"/> </svg>`
    const saveIcon = `<svg width="20px" height="20px" viewBox="0 0 64 64"><path d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    const savedIcon = `<svg width="20px" height="20px" viewBox="0 0 64 64"><path d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z" stroke-width="4"/></svg>`
    const loadSpin = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>`

    const { categoria } = useCategoria();
    const { logado } = useAuth();
    const [files, setFiles] = useState([]);
    const [modal, setModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [delURL, setDelURL] = useState();
    const [delCat, setDelCat] = useState();
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const cacheKey = "cacheImagens";            
                const raizDB = await listAll(ref(images, '/'));
                const pastas = raizDB.prefixes.map((folderRef) => folderRef);
    
                const fetchPromises = pastas.map(async (folderRef) => {
                    const pasta = ref(images, folderRef.fullPath);
                    const arquivos = await listAll(pasta);
    
                    const urls = await Promise.all(
                        arquivos.items.map(async (itemRef) => {
                            const url = await getDownloadURL(itemRef);
                            return { url };
                        })
                    );
                    return { cat: folderRef.fullPath, img: urls };
                });
    
                const imagens = await Promise.all(fetchPromises);
                const sortedImagens = imagens.map(folder => ({
                    ...folder,
                    img: folder.img.sort((a, b) => b.url.localeCompare(a.url))
                }));
                localStorage.setItem(cacheKey, JSON.stringify(sortedImagens));
                setFiles(sortedImagens);
    
            } catch (error) {
                console.error("Erro ao buscar URLs ou metadados:", error);
            }
        };
        fetchUrls();
    }, []);
    
    
    useEffect(() => {
        const escFunction = (event) => { if (event.code === 'Escape') { setModal(false) }}
        document.addEventListener('keydown', escFunction);
        return () => document.removeEventListener('keydown', escFunction);
    }, []);

    const excluirImg = async (url, categoria) => {
        const itemRef = ref(images, url);
        await deleteObject(itemRef);
        setFiles((arquivos) =>
            arquivos.map((pasta) => {
                if (pasta.cat === categoria) 
                return {...pasta, img: pasta.img.filter((img) => img.url !== url) };
                return pasta;
            })
        );
    };

    const filtro = files.filter(file => file.cat.toLowerCase() === categoria);
    const abrirModal = (url) => {
        setModal(true);
        setCurrentImageIndex(url);
    };

    return (
        <>
            <div className='mansonry z-10' key='mansonry'>
                {filtro.map((pastinha) => (
                    <span key={pastinha.cat}>
                        {pastinha.img.map(({ url }, index) => (

                            <Figure 
                                url={url} 
                                cat={pastinha.cat} 
                                logado={logado} 
                                abrirModal={abrirModal} 
                                deletar={deletar} 
                                setConfirmation={setConfirmation} 
                                setDelURL={setDelURL} 
                                setDelCat={setDelCat} 
                                key={index} 
                                saveIcon={saveIcon} 
                                savedIcon={savedIcon} 
                            />
                        ))}
                        
                    </span>
                ))}
                
            </div>
            {confirmation && 
                    <div className='fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-[999999] grid place-items-center backdrop-saturate-0' key='msg'>
                        <div className='flex flex-col justify-center items-center bg-gray-200/30 backdrop-blur-md rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl'>
                            <h2 className='font-semibold text-gray-50'>TEM CERTEZA?</h2>
                            <div className='flex justify-center items-center gap-4'>
                                <button onClick={() => { excluirImg(delURL, delCat), setConfirmation(false) }} className='bg-black px-4 py-2 text-white text-sm rounded-lg'> DELETAR</button>
                                <button onClick={() => setConfirmation(false)} className='bg-white px-4 py-2 text-black text-sm rounded-lg'>CANCELAR</button>
                            </div>
                        </div>
                    </div>
                }
            {modal && filtro.map((pastinha, index) => (
                <Modal params={{ pastinha, deletar, logado, currentImageIndex, saveIcon, savedIcon, setModal, setConfirmation, setDelURL, setDelCat, loadSpin, modal }} key='asd'/>
                ))
            }
        </>
    );
};
export default Mansonry;
