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
    const deletar = `<svg fill="#000000" width="15px" height="15px" viewBox="0 0 408.483 408.483"> <g> <g> <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/> <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/> </g> </g> </svg>`
    const star = `<svg width="20px" height="20px" viewBox="0 0 24 24" ><path d="M12 2.5a1 1 0 0 1 .894.553l2.58 5.158 5.67.824a1 1 0 0 1 .554 1.706l-4.127 4.024.928 5.674a1 1 0 0 1-1.455 1.044L12 18.807l-5.044 2.676a1 1 0 0 1-1.455-1.044l.928-5.674-4.127-4.024a1 1 0 0 1 .554-1.706l5.67-.824 2.58-5.158A1 1 0 0 1 12 2.5zm0 3.236l-1.918 3.836a1 1 0 0 1-.75.543l-4.184.608 3.05 2.973a1 1 0 0 1 .289.878L7.8 18.771l3.731-1.98a1 1 0 0 1 .938 0l3.731 1.98-.687-4.197a1 1 0 0 1 .289-.877l3.05-2.974-4.183-.608a1 1 0 0 1-.75-.543L12 5.736z" fill="#0D0D0D"/></svg>`
    const starred = `<svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24"><path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1l0,0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>`
    
    const { categoria } = useCategoria();
    const { logado } = useAuth();
    const [files, setFiles] = useState([]);
    const [modal, setModal] = useState(false);
    const [colors, setColors] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [delURL, setDelURL] = useState();
    const [delCat, setDelCat] = useState();
    const [currentCategoryImages, setCurrentCategoryImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const [favorite, setFavorite] = useState({});
    const [viewFav, setViewFave] = useState(false)

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

    const filtro = files.filter(file => categoria === 'todos' || file.cat.toLowerCase() === categoria);

    const abrirModal = (url, categoria) => {
        setModal(true);
        setCurrentCategoryImages(categoria);
        const clickedImageIndex = categoria.findIndex(image => image.url === url);
        setCurrentImageIndex(clickedImageIndex);
    };
    
    const dataUpload = (hour) => new Intl.DateTimeFormat('pt','BR').format(new Date(hour))


    useEffect(() => {
        const favoritados = JSON.parse(localStorage.getItem('favoritos')) || {};
        setFavorite(favoritados);
    }, []);

    const favoritar = url => {
        setFavorite(prevFavorites => {
            const updatedFavorites = { ...prevFavorites, [url]: !prevFavorites[url] };
            localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <>
            <button className='fixed md:right-12 right-[unset] left-5 md:left-[unset] top-[17px] z-50 [&>svg_path]:fill-gray-300 hover:brightness-150 duration-100 ' dangerouslySetInnerHTML={{__html:starred }} onClick={() => setViewFave(true)}></button>
    
            {viewFav && 
                <div className="fixed right-0 top-0 h-full md:w-[400px] w-full dark:bg-[#000000cc] bg-[#ddddddcc] backdrop-blur-sm z-50 overflow-y-scroll p-8">
                    <div className="flex gap-3">
                        <button onClick={() => setViewFave(false)} className='w-5 h-5 rounded-full p-2 leading-[0] z-50 cursor-pointer'>&lt;</button>
                        <h3 className="text-gray-700 dark:text-gray-300 font-bold text-left">Ilustras Favoritadas</h3>
                    </div>
                    <div className="flex flex-wrap gap-5 justify-stretch mx-auto py-8">
                        {Object.entries(favorite).map((item, index) => (
    
                            <>
                                {item[1] ? 
                                    <figure key={index} className="relative">
                                        <button className="bg-red-500 text-gray-100 w-8 h-8 rounded-full absolute -top-3 -right-1 text-base [scale:.6] leading-[0]" onClick={()=>favoritar(item[0])}>x</button>
                                        <img src={item[0]}  className="w-28 h-28 object-contain rounded-md"/>
                                    </figure> : ''}
                            </>
    
                        ))
                        }
                    </div>
                </div>
            }
            <div className='mansonry' key='mansonry' style={{ zIndex: modal ? 99 : 5 }}>
                {filtro.map((pastinha) => (
                    <span key={pastinha.cat} id={pastinha.cat.toLowerCase()}>
                        {pastinha.img.map(({ url, timeCreated }, index) => (
                            <figure key={index} className={`item ${pastinha.cat.toLowerCase()} [&:has(img:hover)_button]:opacity-100 [&:has(button:hover)_button]:opacity-100`} style={{ color: colors[url] }} >
    
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
                                    onClick={() => abrirModal(url, pastinha.img)}
                                    alt={`${pastinha.cat} | BRUNO FRANCISCO`}  
                                />
                                <figcaption className='flex flex-col justify-end text-left ' >
                                    <span className='text-base text-gray-200 font-semibold leading-none'>{pastinha.cat}</span>
                                    <time className='text-[.6rem] text-gray-300 leading-none'>enviado: {dataUpload(timeCreated)}</time>
                                </figcaption>
    
                                <button dangerouslySetInnerHTML={{__html: favorite[url] ? starred : star}}
                                        className='[&>svg_path]:fill-yellow-400 hover:brightness-150 duration-100 z-50 absolute bottom-2 right-2'
                                        onClick={() => favoritar(url)}>
                                </button>
    
                            </figure>
                        ))}
                    </span>
                ))}
                {confirmation && 
                    <div className='fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 grid place-items-center z-[999999]'>
                        <div className='flex flex-col justify-center items-center bg-gray-200/30 backdrop-blur-md rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl'>
                            <h2 className='font-semibold text-gray-50'>TEM CERTEZA?</h2>
                            <div className='flex justify-center items-center gap-4'>
                                <button onClick={() => { excluirImg(delURL, delCat), setConfirmation(false) }} className='bg-black px-4 py-2 text-white text-sm rounded-lg'> DELETAR</button>
                                <button onClick={() => setConfirmation(false)} className='bg-white px-4 py-2 text-black text-sm rounded-lg'>CANCELAR</button>
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
        </>
    );
};
export default Mansonry;
