"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from './context/AppContext';
import './mansonry.css';
import Figure from './components/Figure.jsx';
import ColorThief from 'colorthief';
import SquircleMask from './components/SquircleMask';

const Mansonry = ({ category, initialImages = [] }) => {
  const { setUpWindow, setNova } = useAppContext();
  const [images, setImages] = useState(initialImages);
  const [imagePalettes, setImagePalettes] = useState([]);
  const [dColor, setDcolor] = useState('#0005');

  // Update images if category changes or initialImages updates (though in Next.js navigation, component might remount)
  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  useEffect(() => {
    const fetchColorPalettes = async () => {
      if (!images.length) return;

      const palettes = await Promise.all(
        images.map(async (image) => {
          const paletteKey = `palette-${image.url}`;
          const sizeKey = `size-${image.url}`;
          const cachedPalette = localStorage.getItem(paletteKey);
          const cachedSize = localStorage.getItem(sizeKey);

          if (cachedPalette && cachedSize) {
            const size = JSON.parse(cachedSize);
            return {
              url: image.url,
              colors: JSON.parse(cachedPalette),
              name: image.nome,
              id: image.id,
              width: size.width,
              height: size.height
            };
          }

          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = image.url;

          return new Promise((resolve) => {
            const baseData = { url: image.url, name: image.nome, id: image.id };
            img.onload = () => {
              const colorThief = new ColorThief();
              const palette = colorThief.getPalette(img, 3);
              const hexPalette = palette.map(rgb => `#${rgb.map(v => v.toString(16).padStart(2, "0")).join("")}`);

              // Save dimensions
              const dimensions = {
                width: img.naturalWidth,
                height: img.naturalHeight
              };

              localStorage.setItem(paletteKey, JSON.stringify(hexPalette));
              localStorage.setItem(sizeKey, JSON.stringify(dimensions));

              resolve({
                ...baseData,
                colors: hexPalette,
                width: dimensions.width,
                height: dimensions.height
              });
            };
            img.onerror = () => resolve({
              ...baseData,
              colors: ["#cccccc"],
              width: 400,
              height: 400
            });
          });
        })
      );
      setImagePalettes(palettes);
    };

    fetchColorPalettes();
  }, [images]);


  return (
    <div className='mansonry z-10 [&:has(.prompt)_figure]:grayscale h-auto py-14 px-5' key='mansonry'>

      {imagePalettes.map(({ url, colors, name, id, width, height }, index, array) => {
        return (
          <Figure
            array={array}
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
            width={width}
            height={height}
          />
        );
      })}
    </div>
  );
};
export default Mansonry;
