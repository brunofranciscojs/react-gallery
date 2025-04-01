import React, { useEffect, useState } from 'react';
import './mansonry.css';
import Modal from './components/Modal.jsx';
import Figure from './components/Figure.jsx';
import { getImagesByCategory } from './contexto/ImagesDB.jsx';
import ColorThief from 'colorthief';

const Mansonry = ({ category }) => {
    const [images, setImages] = useState([]);
    const [modal, setModal] = useState(false);
    const [openedImage, setOpenedImage] = useState(0); 
    const [imagePalettes, setImagePalettes] = useState([]);
    const [dColor, setDcolor] = useState('#0005')

    useEffect(() => {
        getImagesByCategory(category).then(files => {
            const stamp = (time) => new Date(time).getTime();
    
            const archives = files.sort((a, b) => stamp(b.created_at) - stamp(a.created_at)); 
    
            setImages(archives);
        });
    }, [category]);

    useEffect(() => {
        const fetchColorPalettes = async () => {
    
            const palettes = await Promise.all(
                images.map(async (image) => {

                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.src = image.url;
    
                    return new Promise((resolve) => {
                        img.onload = () => {
                            try {
                                const colorThief = new ColorThief();
                                const palette = colorThief.getPalette(img, 3);
                                const hexPalette = palette.map((rgb) =>
                                    `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`
                                );
                                resolve({ url: image.url, colors: hexPalette, name: image.nome });
                            } catch (error) {
                                console.error("Erro ao extrair cores:", error);
                                resolve({ url: image.url, colors: ['#cccccc'] });
                            }
                        };
    
                        img.onerror = () => resolve({ url: image.url, colors: ['#cccccc'] });
                    });
                })
            );
            setImagePalettes(palettes);
        };
        fetchColorPalettes();

    }, [images]);

    useEffect(() => {
        const escFunction = (event) => { if (event.code === 'Escape') { setModal(false) }}
        document.addEventListener('keydown', escFunction);
        return () => document.removeEventListener('keydown', escFunction);
    }, []);


    const abrirModal = (url) => {
        setModal(true);
        setOpenedImage(url)
    };
    
    return (
        <>
            <div className='mansonry z-10 [&:has(.prompt)_figure]:grayscale' key='mansonry'>
                {imagePalettes.map(({ url, colors, name }, index) => (
                    <Figure 
                        url={url} 
                        key={index} 
                        cat={category} 
                        abrirModal={abrirModal} 
                        index={index} 
                        name={name}
                        colors={colors}
                        setDcolor={setDcolor}
                        onMouseEnter={() => localStorage.setItem('dColor',colors[0]) }
                        >
                    </Figure>
                ))}
                
            </div>
           
              {modal && <Modal params={{ setModal, modal, openedImage, dColor }} /> }
        </>
    );
};
export default Mansonry;
