import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../contexto/supabaseClient';
import ImageZoom from "react-image-zooom";

export default function Imagem() {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [relatedImages, setRelatedImages] = useState([]);
  const [searchParams] = useSearchParams();
  const bgc = decodeURIComponent(searchParams.get("bgc"));

  const slugify = (text) =>{
        return text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");
  }

  useEffect(() => {
    const fetchImage = async () => {
      const { data, error } = await supabase
      .from('imagens')
      .select('url, nome, categoria, id')
      .eq('id', imageId)

      if (error) {
        console.error('Error fetching image:', error);
        navigate('/', { viewTransition: true });
        return;
      }
      if (!error && data) {
        const comCor = data.map((img) => {
          const paletteKey = `palette-${img.url}`;
          const cachedPalette = localStorage.getItem(paletteKey);
          const colors = cachedPalette ? JSON.parse(cachedPalette) : ["#cccccc"];
          return { ...img, colors };
        });
      setImage(comCor[0]);
    }
  }

    fetchImage();
  }, [imageId]);

  useEffect(() => {
  if (!image) return;

  const fetchRelated = async () => {
      const { data, error } = await supabase.rpc("related_images_random", {
        p_categoria: image.categoria,
        p_exclude_nome: image.nome,
        p_id: image.id,
        p_limit: 6,
      });

    if (!error && data) {
      const enriched = data.map((img) => {
        const paletteKey = `palette-${img.url}`;
        const cachedPalette = localStorage.getItem(paletteKey);
        const colors = cachedPalette ? JSON.parse(cachedPalette) : ["#cccccc"];
        return { ...img, colors };
      });

      setRelatedImages(enriched);
    }
};
  fetchRelated();
}, [image]);

  if (!image) return null;

  return (
    <div className="bg-gray-200 flex gap-5 flex-col-reverse xl:flex-row items-start justify-center relative h-full w-full mx-auto imagem z-50">
        <div className='flex flex-col xl:w-[40%] w-full items-center self-center'>
          <div>
            <h1 className='text-3xl font-semibold text-gray-900 mt-6 cl:mt-0 cl:text-left text-center'>{image.nome}</h1>
            <h2 className='text-sm text-gray-600 cl:text-left text-center mt-1'>Categoria: {image.categoria}</h2>
          </div>
          <div className="mt-4 flex gap-4 xl:max-w-[600px] max-w-full z-50 flex-wrap p-12 place-self-center">
            {relatedImages.map((rel) => (
              <div key={rel.nome} className="bg-gray-300 w-32 cl:h-44 h-32 cursor-pointer overflow-hidden hover:[&_img]:[scale:1.05] [clip-path:url(#squircle-mask)] [-webkit-clip-path:url(#squircle-mask)]" 
                   onClick={() => navigate(`/${slugify(image.categoria)}/${rel.id}?bgc=${encodeURIComponent(rel.colors[0])}`, { viewTransition: true })}>
                <img  src={rel.url} alt={rel.nome} className="w-full h-full object-cover duration-100 object-top"/>
              </div>
            ))}
          </div>
        </div>

        <div className="z-10 relative xl:w-[60%] w-full min-h-dvh " data-image={image.nome} style={{ viewTransitionName: `figure-${image.id}` }}>
          <a style={{background:bgc, viewTransitionName: `caption-${image.id}` }} className={`leading-none text-lg cursor-pointer text-white absolute right-[unset] cl:right-12 cl:top-12 top-[unset] cl:bottom-unset bottom-20 cl:left-[unset] left-1/2 z-50  rounded-full p-2 h-8 w-8`} 
             onClick={() => navigate(`/${slugify(image.categoria)}`, { viewTransition: true })}>X</a>
          <ImageZoom zoom={170}  fullWidth={true} src={image.url} className={`[clip-path:url(#squircle-mask)] [-webkit-clip-path:url(#squircle-mask)]  [&_img]:mx-auto cl:!block !hidden w-auto [&_img]:h-dvh [&_img]:object-contain [&_img]:rounded-2xl !z-10 mx-auto [&_img]:!w-auto duration-100 !bg-transparent`} />
          <img src={image.url} style={{ viewTransitionName: `figure-${image.id}` }} className={`[clip-path:url(#squircle-mask)] [-webkit-clip-path:url(#squircle-mask)] xl:block hidden h-dvh object-contain [scale:.9] !z-0 blur-[10rem] saturate-[3] mx-auto !w-auto duration-100 absolute top-0 left-1/2 -translate-x-1/2 mix-blend-hard-light`} />
          <img src={image.url} style={{ viewTransitionName: `figure-${image.id}` }} className={`[clip-path:url(#squircle-mask)] [-webkit-clip-path:url(#squircle-mask)] block xl:hidden h-dvh object-contain rounded-2xl !z-10 mx-auto !w-auto duration-100 [anchor-name:--mirror] p-8 !bg-transparent`} />
        </div>
    </div>
  );
}