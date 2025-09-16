import React, { useEffect, useState, useRef } from 'react';
import './mansonry.css';
import Figure from './components/Figure.jsx';
import { getImagesByCategory } from './contexto/ImagesDB.jsx';
import ColorThief from 'colorthief';

const Mansonry = ({ category, setUpWindow, setNova }) => {
  const [images, setImages] = useState([]);
  const [imagePalettes, setImagePalettes] = useState([]);
  const [dColor, setDcolor] = useState('#0005');
  
  const CACHE_KEY = `imagens-${category}`;
  const LAST_CLEAN_KEY = "last-clean-images";
  const CLEAN_INTERVAL = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const fetchImages = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const cachedImages = JSON.parse(cachedData);
        setImages(cachedImages);
      }
      const files = await getImagesByCategory(category);
      const sortedFiles = files.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const lastClean = localStorage.getItem(LAST_CLEAN_KEY);
      const now = Date.now();
      if (!lastClean || now - parseInt(lastClean, 10) > CLEAN_INTERVAL) {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith("imagens-") || key.startsWith("palette-") || key.startsWith("size-")) {
            localStorage.removeItem(key);
          }
        });
        localStorage.setItem(LAST_CLEAN_KEY, now.toString());
      }
      if (JSON.stringify(sortedFiles) !== cachedData) {
        setImages(sortedFiles);
        localStorage.setItem(CACHE_KEY, JSON.stringify(sortedFiles));
      }
    };

    fetchImages();
  }, [category]);

  useEffect(() => {
    const fetchColorPalettes = async () => {
      if (!images.length) return;

      const palettes = await Promise.all(
        images.map(async (image) => {
          const paletteKey = `palette-${image.url}`;
          const cachedPalette = localStorage.getItem(paletteKey);
          if (cachedPalette) {
            return { url: image.url, colors: JSON.parse(cachedPalette), name: image.nome, id: image.id };
          }

          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = image.url;

          return new Promise((resolve) => {
            const baseData = { url: image.url, name: image.nome, id: image.id };
            img.onload = () => {
              const colorThief = new ColorThief();
              const palette = colorThief.getPalette(img, 3);
              const hexPalette = palette.map(rgb =>`#${rgb.map(v => v.toString(16).padStart(2, "0")).join("")}`);
              localStorage.setItem(paletteKey, JSON.stringify(hexPalette));
              resolve({ ...baseData, colors: hexPalette });
            };
            img.onerror = () =>  resolve({ ...baseData, colors: ["#cccccc"] });
          });
        })
      );
      setImagePalettes(palettes);
    };

    fetchColorPalettes();
  }, [images]);

  return (
    <div className='mansonry z-10 [&:has(.prompt)_figure]:grayscale h-auto py-14 px-5' key='mansonry'>
      {imagePalettes.map(({ url, colors, name, id }, index) => {
        return (
          <Figure
            key={index}
            url={url}
            cat={category}
            index={index}
            name={name}
            colors={colors}
            setDcolor={setDcolor}
            setUpWindow={setUpWindow}
            setNova={setNova}
            id={id}
          />
        );
      })}
    </div>
  );
};
export default Mansonry;
