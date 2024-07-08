import React, { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { images } from './firebaseData.jsx';
import { FastAverageColor } from 'fast-average-color';
import { useCategoria } from "./Context.jsx";
import './mansonry.css';

const Mansonry = () => {
    const [files, setFiles] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const { categoria } = useCategoria();
    const [colors, setColors] = useState({});
    
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

            const fac = new FastAverageColor();
            const colorPromises = allFiles.flatMap(pasta =>
                pasta.img.map(async (url) => {
                    const color = await fac.getColorAsync(url);
                    return { url, color: color.hex };
                })
            );

            const colorResults = await Promise.all(colorPromises);
            const colorMap = colorResults.reduce((acc, { url, color }) => {
                acc[url] = color;
                return acc;
            }, {});
            setColors(colorMap);
        };
        fetchUrls();
    }, []);

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.code === 'Escape') {
                setModal(false);
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    const filteredFiles = files.filter(file => categoria === 'todos' || file.cat.toLowerCase() === categoria);

    return (
        <div className='mansonry' key='mansonry' style={{zIndex:modal ? 99 : 0}}>
            {filteredFiles.map((pastinha) => (
                <span key={pastinha.cat} className='placeholder' id={pastinha.cat.toLowerCase()}>
                    {pastinha.img.map((url, index) => (
                        <figure key={index} className={`item ${pastinha.cat.toLowerCase()}`}>
                            <img
                                loading="lazy"
                                src={url}
                                onClick={() => {
                                    setModal(true);
                                    setModalImage(url);
                                }}
                                alt={`${pastinha.cat} | BRUNO FRANCISCO`}
                                style={{ color: colors[url]+'aa' || 'transparent' }}
                                onLoad={(e) => e.target.parentNode.parentNode.classList.remove('placeholder')}
                            />
                            <figcaption>{pastinha.cat}</figcaption>
                        </figure>
                    ))}
                </span>
            ))}
            {modal && (
                <div className="modal" style={{backgroundColor: colors[modalImage]+66 || '#00000077'}}>
                    <button onClick={() => setModal(false)} className='bg-black w-8 h-8 rounded-full p-2 leading-none'>X</button>
                    <img src={modalImage} className='relative z-0'/>
                </div>
            )}
        </div>
    );
};

export default Mansonry;
