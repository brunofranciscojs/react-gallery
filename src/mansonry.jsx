import React, { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref, getMetadata, deleteObject } from "firebase/storage";
import { images } from './firebaseData.jsx';
import { useCategoria } from "./Context.jsx";
import './mansonry.css';
import useAuth from './hooks/useAuth.jsx'
import Modal from './components/Modal.jsx';
import Figure from './components/Figure.jsx';
import { FastAverageColor } from 'fast-average-color';
import ColorThief from 'colorthief';

const Mansonry = ({ imagem }) => {
    const { categoria } = useCategoria();
    const { logado } = useAuth();
    const [files, setFiles] = useState([]);
    const [modal, setModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [delURL, setDelURL] = useState();
    const [delCat, setDelCat] = useState();
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const [dColor, setDcolor] = useState('#0005')

    useEffect(() => {
        const cacheKey = "savedImages";
    
        const fetchColorPalette = async (imageUrl) => {
            return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imageUrl;
        
            img.onload = () => {
                try {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(img, 3);
                const hexPalette = palette.map((rgb) => `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`);
                resolve(hexPalette); 
                } catch (error) {
                console.error("Erro ao extrair cores:", error);
                resolve(['#cccccc']);
                }
            };
        
            img.onerror = () => resolve(['#cccccc']);
            });
        };
            
        const fetchUrls = async () => {
            const cachedData = localStorage.getItem(cacheKey);
            let cachedFiles = cachedData ? JSON.parse(cachedData) : null;
            if (cachedFiles) {
                setFiles(cachedFiles);
            }
    
            const raizDB = await listAll(ref(images, "/"));
            const pastas = raizDB.prefixes;
    
            const fetchPromises = pastas.map(async (folderRef) => {
                const pasta = ref(images, folderRef.fullPath);
                const arquivos = await listAll(pasta);
    
                const urls = await Promise.all(
                    arquivos.items.map(async (itemRef) => {
                      const [url, metadata] = await Promise.all([
                        getDownloadURL(itemRef),
                        getMetadata(itemRef),
                      ]);
                  
                      const palette = await fetchColorPalette(url);
                      
                      return { 
                        url, 
                        fileName: itemRef.name,
                        timeCreated: new Date(metadata.timeCreated),
                        palette
                      };
                    })
                  );
    
                urls.sort((a, b) => b.timeCreated - a.timeCreated);
                return { cat: folderRef.fullPath, img: urls };
            });
    
            const imagens = await Promise.all(fetchPromises);
    
            if (!cachedFiles || JSON.stringify(cachedFiles) !== JSON.stringify(imagens)) {
                localStorage.setItem(cacheKey, JSON.stringify(imagens));
                setFiles(imagens);
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

    const filtro = files.filter(file => file.cat.toLowerCase() === categoria );

    const abrirModal = (url) => {
        setModal(true);
        setCurrentImageIndex(url);
    };
    const getFileNameFromUrl = (url, category) => {
        const encodedCategory = encodeURIComponent(category);
        return url.split('/').pop().split('?')[0].replace(encodedCategory + '%2F', '');
    };
    
    
    return (
        <>
            <div className='mansonry z-10' key='mansonry'>
                {filtro.map((pastinha) => (
                    <React.Fragment key={pastinha.cat}>
                        {pastinha.img.map(({ url, palette }, index) => (
                            <Figure 
                                url={url} 
                                cat={pastinha.cat} 
                                logado={logado}
                                abrirModal={abrirModal} 
                                setConfirmation={setConfirmation} 
                                setDelURL={setDelURL} 
                                setDelCat={setDelCat} 
                                key={index} 
                                index={index}
                                cor={palette[0]} 
                                getFileNameFromUrl={getFileNameFromUrl}
                                setDcolor={setDcolor}
                                onMouseEnter={() =>{ imagem(url); localStorage.setItem('dColor',palette[0]) }}
                            />
                        ))}
                        
                    </React.Fragment>
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
                <Modal params={{ pastinha, logado, currentImageIndex, setModal, setConfirmation, setDelURL, setDelCat, modal, dColor }} key={index}/>
              ))
            }
        </>
    );
};
export default Mansonry;
