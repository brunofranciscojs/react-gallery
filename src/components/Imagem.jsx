import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../contexto/supabaseClient';
import ImageZoom from "react-image-zooom";

export default function ImageDetail() {
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
      const { data, error } = await supabase
      .from('imagens')
      .select('url, nome, categoria, id')
      .eq('id', imageId)

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
      p_id: image.id,
      p_limit: 6
    });

    if (!error) setRelatedImages(data);
  };
  fetchRelated();
}, [image]);


  if (!image) return null;

  return (
    <div className="bg-[#efefef] flex gap-5 flex-col cl:flex-row items-center justify-center relative h-full w-full mx-auto z-[999]" style={{ "--dColor":localStorage.getItem('dColor')+'cc'}}>
        <div className="z-10 relative">
          <a className={`leading-none text-xl cursor-pointer text-black absolute right-[unset] cl:right-0 cl:top-12 top-[unset] cl:bottom-unset bottom-20 cl:left-[unset] left-1/2 z-50`} onClick={() => navigate(`/${slugify(image.categoria)}`)}>X</a>
          <ImageZoom zoom={220}  fullWidth={true} src={image.url} className={`cl:!block !hidden [&_img]:shadow-xl w-auto [&_img]:h-[88dvh] [&_img]:object-contain [&_img]:rounded-2xl !z-10 mx-auto [&_img]:!w-auto duration-100 [anchor-name:--mirror] p-8 !bg-transparent`} />
          <img src={image.url} className={`shadow-xl block cl:hidden h-[88dvh] object-contain rounded-2xl !z-10 mx-auto !w-auto duration-100 [anchor-name:--mirror] p-8 !bg-transparent`} />
        </div>

        <div className='flex flex-col'>
          <div>
            <h1 className='text-3xl font-semibold text-gray-900 mt-6 cl:mt-0 cl:text-left text-center'>{image.nome}</h1>
            <h2 className='text-sm text-gray-600 cl:text-left text-center mt-1'>Categoria: {image.categoria}</h2>
          </div>
          <div className="mt-4 flex gap-4 cl:max-w-[300px] max-w-full z-50 flex-wrap ">
            {relatedImages.map((rel) => (
              <div key={rel.nome}  className="w-32 cl:h-44 h-32 cursor-pointer overflow-hidden rounded-lg hover:[&_img]:[scale:1.05]" onClick={() => navigate(`/${slugify(image.categoria)}/${rel.id}`)}>
                <img  src={rel.url} alt={rel.nome} className="w-full h-full object-cover duration-100 object-top"/>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}