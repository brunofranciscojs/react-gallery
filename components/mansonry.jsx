"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import '@/styles/mansonry.css';
import Figure from '@/components/Figure.jsx';
import ColorThief from 'colorthief';
import Image from 'next/image';
import ModalImage from './ModalImage';

const Mansonry = ({ category, initialImages = [] }) => {
  const { setUpWindow, setNova } = useAppContext();
  const [images, setImages] = useState(initialImages);
  const [imagePalettes, setImagePalettes] = useState([]);
  const [dColor, setDcolor] = useState('#0005');

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
              width: image.width || size.width,
              height: image.height || size.height
            };
          }

          const img = new window.Image();
          img.crossOrigin = 'Anonymous';
          img.src = image.url.replace('/storage/v1/object/', '/storage/v1/render/image/') + '?width=50&quality=50';

          return new Promise((resolve) => {
            const baseData = { url: image.url, name: image.nome, id: image.id };
            img.onload = () => {
              const colorThief = new ColorThief();
              const palette = colorThief.getPalette(img, 3);
              const hexPalette = palette.map(rgb => `#${rgb.map(v => v.toString(16).padStart(2, "0")).join("")}`);

              const dimensions = {
                width: image.width || img.naturalWidth,
                height: image.height || img.naturalHeight
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
    <div className='mansonry z-10 [&:has(.prompt)_figure]:grayscale h-auto py-24 px-5' >
      {imagePalettes.map(({ url, colors, name, id, width, height }, index, array) => {
        return (
          <React.Fragment key={id}>
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

            <ModalImage
              key={index + 1}
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

          </React.Fragment>
        );
      })}

    </div>
  );
};
export default Mansonry;
