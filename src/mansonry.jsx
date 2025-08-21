import React, { useEffect, useState, useRef } from 'react';
import './mansonry.css';
import Modal from './components/Modal.jsx';
import Figure from './components/Figure.jsx';
import { getImagesByCategory } from './contexto/ImagesDB.jsx';
import ColorThief from 'colorthief';

const Mansonry = ({ category, setUpWindow, setNova }) => {
    const [images, setImages] = useState([]);
    const [modal, setModal] = useState(false);
    const [openedImage, setOpenedImage] = useState(0); 
    const [imagePalettes, setImagePalettes] = useState([]);
    const [dColor, setDcolor] = useState('#0005');
    const [placeholders, setPlaceholders] = useState({});
    const CACHE_KEY = `imagens-${category}`;
    const LAST_CLEAN_KEY = "last-clean-images";
    const CLEAN_INTERVAL = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const fetchImages = async () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedImages = cachedData ? JSON.parse(cachedData) : null;
            
            const files = await getImagesByCategory(category);
            const sortedFiles = files.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            if (!cachedImages) {
                setImages(sortedFiles);
                localStorage.setItem(CACHE_KEY, JSON.stringify(sortedFiles));
                return;
            }

            const lastClean = localStorage.getItem(LAST_CLEAN_KEY);
            const now = Date.now();

            if (!lastClean || now - parseInt(lastClean, 10) > CLEAN_INTERVAL) {
              Object.keys(localStorage).forEach((key) => {
                if (key.startsWith("images-")) {
                    localStorage.removeItem(key);
                }
              });

              localStorage.setItem(LAST_CLEAN_KEY, now.toString());
            }
            setImages(sortedFiles);
        };
        fetchImages();
    }, [category]);

    useEffect(() => {
        const fetchColorPalettes = async () => {
            if (!images.length) return;

            const palettes = await Promise.all(
                images.map(async (image) => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.src = image.url;

                    return new Promise((resolve) => {
                        img.onload = () => {
                            const colorThief = new ColorThief();
                            const palette = colorThief.getPalette(img, 3);
                            const hexPalette = palette.map((rgb) =>
                                `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`
                            );
                            resolve({ url: image.url, colors: hexPalette, name: image.nome });
                        };
                        img.onerror = () => {
                            resolve({ url: image.url, colors: ['#cccccc'] });
                        };
                    });
                })
            );
            setImagePalettes(palettes);
        };

        fetchColorPalettes();
    }, [images]);

    useEffect(() => {
        const sizes = {};
        images.forEach(image => {
            const size = localStorage.getItem(`size-${image.url}`);
            if (size) {
                sizes[image.url] = JSON.parse(size);
            }
        });
        setPlaceholders(sizes);
    }, [images]);


    useEffect(() => {
        const escFunction = (event) => {
            if (event.code === 'Escape') { setModal(false) }
        };
        document.addEventListener('keydown', escFunction);
        return () => document.removeEventListener('keydown', escFunction);
    }, []);

    const abrirModal = (url) => {
        setModal(true);
        setOpenedImage(url);
    };
    
    return (
        <>
        <div className='mansonry z-10 [&:has(.prompt)_figure]:grayscale h-auto' key='mansonry'>
            {imagePalettes.map(({ url, colors, name }, index) => {
                const size = placeholders[url] || { width: 200, height: 200 };
                return (
                    <Figure 
                        key={index} 
                        url={url} 
                        cat={category} 
                        abrirModal={abrirModal} 
                        index={index} 
                        name={name}
                        colors={colors}
                        setDcolor={setDcolor}
                        placeholderSize={size}
                        setUpWindow={setUpWindow}
                        setNova={setNova}
                    />
                );
            })}
        </div>
        {modal && <Modal params={{ setModal, modal, openedImage, dColor }} />}
        </>
    );
};
export default Mansonry;
