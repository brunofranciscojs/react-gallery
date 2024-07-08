import React, { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref, getMetadata } from "firebase/storage";
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
            const raizDB = await listAll(ref(images, '/'));
            const pastas = raizDB.prefixes.map((folderRef) => folderRef);

            const fetch = pastas.map(async (folderRef) => {
                const pasta = ref(images, folderRef.fullPath);
                const arquivos = await listAll(pasta);
                const urlsWithMetadata = await Promise.all(
                    arquivos.items.map(async (itemRef) => {
                        const url = await getDownloadURL(itemRef);
                        const metadata = await getMetadata(itemRef);
                        return { url, timeCreated: metadata.timeCreated };
                    })
                );
                return { cat: folderRef._location.path_, img: urlsWithMetadata };
            });
            const imagens = await Promise.all(fetch);

            imagens.forEach(pasta => {
                pasta.img.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));
            });

            setFiles(imagens);

            const corDominante = new FastAverageColor();
            const colorPromises = imagens.flatMap(pasta =>
                pasta.img.map(async ({ url }) => {
                    const color = await corDominante.getColorAsync(url);
                    return { url, color: color.hex };
                })
            );

            const cores = await Promise.all(colorPromises);
            const mapaCores = cores.reduce((acc, { url, color }) => {
                acc[url] = color;
                return acc;
            }, {});
            setColors(mapaCores);
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

    const filtro = files.filter(file => categoria === 'todos' || file.cat.toLowerCase() === categoria);

    return (
        <div className='mansonry' key='mansonry' style={{ zIndex: modal ? 99 : 0 }}>
            {filtro.map((pastinha) => (
                <span key={pastinha.cat} className='placeholder' id={pastinha.cat.toLowerCase()}>
                    {pastinha.img.map(({ url }, index) => (
                        <figure key={index} className={`item ${pastinha.cat.toLowerCase()}`}>
                            <img
                                className='bg'
                                loading="lazy"
                                src={url}
                                onClick={() => {
                                    setModal(true);
                                    setModalImage(url);
                                }}
                                alt={`${pastinha.cat} | BRUNO FRANCISCO`}
                                style={{ color: colors[url] + 'aa' || 'transparent' }}
                                onLoad={(e) => e.target.parentNode.parentNode.classList.remove('placeholder')}
                            />
                            <figcaption>{pastinha.cat}</figcaption>
                        </figure>
                    ))}
                </span>
            ))}
            {modal && (
                <div className="modal" style={{ backgroundColor: colors[modalImage] + 66 || '#00000077' }}>
                    <button onClick={() => setModal(false)} className='bg-black w-8 h-8 rounded-full p-2 leading-none z-50'>X</button>
                    <img src={modalImage} className='relative z-0' />
                </div>
            )}
        </div>
    );
};

export default Mansonry;
