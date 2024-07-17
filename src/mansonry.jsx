import React, { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref, getMetadata, deleteObject } from "firebase/storage";
import { images } from './firebaseData.jsx';
import { FastAverageColor } from 'fast-average-color';
import { useCategoria } from "./Context.jsx";
import './mansonry.css';
import useAuth from './hooks/useAuth.jsx'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Mansonry = () => {
    const deletar = `<svg fill="#000000" width="15px" height="15px" viewBox="0 0 408.483 408.483" xml:space="preserve"> <g> <g> <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/> <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/> </g> </g> </svg>`
    
    const [files, setFiles] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const { categoria } = useCategoria();
    const { logado } = useAuth();
    const [colors, setColors] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [delURL, setDelURL] = useState();
    const [delCat, setDelCat] = useState();
    const [currentCategoryImages, setCurrentCategoryImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const exclude = async (url, category) => {
        const itemRef = ref(images, url);
        await deleteObject(itemRef);

        setFiles((arquivos) =>
            arquivos.map((folder) => {
                if (folder.cat === category) 
                return {...folder, img: folder.img.filter((img) => img.url !== url) };
                return folder;
            })
        );
    };

    const filtro = files.filter(file => categoria === 'todos' || file.cat.toLowerCase() === categoria);

    const handleImageClick = (url, categoryImages) => {
        setModal(true);
        setModalImage(url);
        setCurrentCategoryImages(categoryImages);
        const clickedImageIndex = categoryImages.findIndex(image => image.url === url);
        setCurrentImageIndex(clickedImageIndex);
        setTimeout(() => { document.querySelector('.modal').focus() }, 400);
    };

    return (
        <div className='mansonry' key='mansonry' style={{ zIndex: modal ? 99 : 5 }}>
            {filtro.map((pastinha) => (
                <span key={pastinha.cat} id={pastinha.cat.toLowerCase()}>
                    {pastinha.img.map(({ url }, index) => (
                        <figure key={index} className={`item ${pastinha.cat.toLowerCase()} [&:has(img:hover)_button]:opacity-100 [&:has(button:hover)_button]:opacity-100`} style={{ color: colors[url] }}>

                            {logado &&(
                                <button className='absolute top-1 right-1 opacity-0 z-50 shadow-sm bg-gray-50 px-1 py-1 rounded' 
                                        dangerouslySetInnerHTML={{__html: deletar}} 
                                        title='deletar'
                                        onClick={() => { setConfirmation(true), setDelURL(url), setDelCat(pastinha.cat) }}
                                >
                                </button>
                            )}

                            <img
                                className='bg z-40'
                                loading="lazy"
                                src={url}
                                onClick={() => handleImageClick(url, pastinha.img)}
                                alt={`${pastinha.cat} | BRUNO FRANCISCO`}  
                            />
                            <figcaption>{pastinha.cat}</figcaption>
                        </figure>
                    ))}
                </span>
            ))}
            {confirmation && 
                <div className='fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-50 grid place-items-center'>
                    <div className='flex flex-col justify-center items-center bg-gray-200/30 backdrop-blur-md rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl'>
                        <h2 className='font-semibold text-gray-50'>TEM CERTEZA?</h2>
                        <div className='flex justify-center items-center gap-4'>
                            <button onClick={() => { exclude(delURL, delCat), setConfirmation(false) }} className='bg-green-700 px-4 py-2 text-white text-sm rounded-lg'> DELETAR</button>
                            <button onClick={() => setConfirmation(false)} className='bg-red-700 px-4 py-2 text-white text-sm rounded-lg'>CANCELAR</button>
                        </div>
                    </div>
                </div>
            }
            {modal && (
                <div className="modal bg-[#00000033]">
                    <a onClick={() => setModal(false)} className='bg-black w-8 h-8 rounded-full p-2 leading-none z-50 cursor-pointer'>X</a>

                    <Splide options={{type:'loop', rewind:true, start:currentImageIndex, pagination:false}}>
                        {currentCategoryImages.map(({ url }, index) => (
                            <SplideSlide key={index}>
                                <img src={url} alt={`Image ${index}`} className='w-auto h-[95dvh] block mx-auto rounded-3xl object-contain'/>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            )}
        </div>
    );
};

export default Mansonry;
