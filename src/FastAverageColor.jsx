import { useState, useEffect } from 'react';
import FastAverageColor from 'fast-average-color';

const useAverageColor = (imageUrl) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const fac = new FastAverageColor();
    if (imageUrl) {
      fac.getColorAsync(container.querySelector('img'))
        .then(color => {
          setColor(color.rgba);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }, [imageUrl]);

  return color;
};
