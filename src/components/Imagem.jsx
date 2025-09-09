import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../contexto/supabaseClient';
import ImageZoom from "react-image-zooom";

export default function ImageDetail({dColor}) {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [relatedImages, setRelatedImages] = useState([]);

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
      const { data, error } = await supabase.from('imagens').select('url, nome, categoria').eq('nome', atob(imageId))

      if (error) {
        console.error('Error fetching image:', error);
        navigate('/');
        return;
      }
      setImage(data[0]);
    };

    fetchImage();
  }, [imageId]);

  useEffect(() => {
  if (!image) return;

  const fetchRelated = async () => {
    const { data, error } = await supabase.rpc('related_images_random', {
      p_categoria: image.categoria,
      p_exclude_nome: image.nome,
      p_limit: 6
    });

    if (!error) setRelatedImages(data);
  };

  fetchRelated();
}, [image]);


  if (!image) return null;

  return (
    <div className="bg-[#efefef] flex items-center justify-between relative h-dvh w-[1280px] mx-auto" style={{ "--dColor":localStorage.getItem('dColor')+'cc'}}>

        <div className="max-w-svw z-10">
          <a className={`leading-none text-xl cursor-pointer text-black absolute right-5 top-12`} onClick={() => navigate(`/${slugify(image.categoria)}`)}>X</a>
  
          <ImageZoom zoom={200} src={image.url} className={`[&_img]:shadow-xl w-full [&_img]:h-[88dvh] [&_img]:object-contain [&_img]:rounded-2xl !z-10 mx-auto [&_img]:!w-auto duration-100 [anchor-name:--mirror] p-8 !bg-transparent`} />
        </div>

          <img src={image.url} className={`h-[89dvh] object-contain blur-[10rem] pointer-events-none !z-0 mx-auto absolute left-0 top-12`} />
        <div className='z-10'>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">outras de {image.categoria}</h2>

          <div className="mt-4 flex gap-4 flex-wrap max-w-[20vw] z-50 justify-end">
            {relatedImages.map((rel) => (
              <div key={rel.nome}  className="w-32 h-32 cursor-pointer overflow-hidden rounded-lg" onClick={() => navigate(`/imagem/${btoa(rel.nome)}`)}>
                <img  src={rel.url} alt={rel.nome} className="w-full h-full object-cover"/>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}