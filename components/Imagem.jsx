"use client";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import ImageZoom from 'react-image-zooom';
import useAuth from '@/hooks/useAuth'
import DeleteIcon from '@/components/DeleteIcon'
import EditIcon from '@/components/EditIcon'
import ReplaceIcon from '@/components/ReplaceIcon';

export default function Imagem() {
  const params = useParams();
  const imageId = params?.imageId;
  const navigate = useRouter();
  const [relatedImages, setRelatedImages] = useState([]);
  const { logado } = useAuth();
  const [confirmation, setConfirmation] = useState(false);
  const [ren, setRen] = useState(false);
  const [message, setMessage] = useState(false);

  const searchParams = useSearchParams();
  const bgc = decodeURIComponent(searchParams.get("bgc"));
  const urlParam = searchParams.get('url');
  const nameParam = searchParams.get('name');
  const wParam = searchParams.get('w');
  const hParam = searchParams.get('h');
  const catParam = searchParams.get('cat');

  const [image, setImage] = useState(() => {
    if (urlParam && nameParam) {
      return {
        id: imageId,
        url: urlParam,
        nome: nameParam,
        categoria: catParam,
        width: wParam,
        height: hParam,
        colors: [bgc]
      };
    }
    return null;
  });

  const slugify = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  const handleRename = async (newName) => {
    const filePath = url.split('/ilustras/')[1];
    const category = filePath.split('/')[0];
    const newFilePath = `${category}/${newName}`;
    const { data: fileData, error: downloadError } = await supabase.storage.from("ilustras").download(filePath);
    if (downloadError) {
      console.error("Erro ao baixar o arquivo:", downloadError);
      return;
    }
    const { data: uploadData, error: uploadError } = await supabase.storage.from("ilustras").upload(newFilePath, fileData);

    if (uploadError) {
      console.error("Erro ao fazer upload com o novo nome:", uploadError);
      return;
    }
    const newUrl = `https://utyaegtlratnhymumqjm.supabase.co/storage/v1/object/public/ilustras/${newFilePath}`;
    const { error: dbError } = await supabase.from("imagens").update({ url: newUrl, nome: newName }).eq("url", url);

    if (dbError) {
      console.error("Erro ao atualizar no banco:", dbError);
      return;
    }
    const { error: deleteError } = await supabase.storage.from("ilustras").remove([filePath]);

    if (deleteError) {
      console.error("Erro ao excluir o arquivo antigo:", deleteError);
      return;
    }
    console.log("Arquivo renomeado com sucesso!");
    setMessage(true)
  };

  const handleDelete = async (url) => {
    const filePath = url.split('/ilustras/')[1];
    const { error: storageError } = await supabase.storage.from("ilustras").remove([filePath]);

    if (storageError) {
      console.error("Erro ao excluir do storage:", storageError);
      return;
    }
    const { error: dbError } = await supabase.from("imagens").delete().eq("url", url);

    if (dbError) {
      console.error("Erro ao excluir do banco:", dbError);
      return;
    }
    console.log("Arquivo excluído com sucesso!");
  };

  useEffect(() => {
    if (!imageId) return;
    const fetchImage = async () => {
      const { data, error } = await supabase
        .from('imagens')
        .select('url, nome, categoria, id, width, height')
        .eq('id', imageId)

      if (error) {
        console.error('Error fetching image:', error);
        navigate.push('/');
        return;
      }
      if (!error && data && data.length > 0) {
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

  if (!image) {
    return (
      <div className="bg-gray-200 flex gap-5 flex-col-reverse xl:flex-row items-start justify-center relative h-full w-full mx-auto imagem z-50">
        <div className='flex flex-col xl:w-[40%] w-full items-center self-center'>
          <div>
            <div className='h-9 w-48 bg-gray-300 rounded-lg animate-pulse mt-6 cl:mt-0 mx-auto cl:mx-0'></div>
            <div className='h-4 w-32 bg-gray-300 rounded-lg animate-pulse mt-2 mx-auto cl:mx-0'></div>
          </div>
          <div className="mt-4 flex gap-4 xl:max-w-[600px] max-w-full z-50 flex-wrap p-12 place-self-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-300 w-32 cl:h-44 h-32 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>

        <div className="z-10 relative xl:w-[60%] w-full min-h-dvh">
          <Link href={`/`} style={{ "--bg": bgc }}
            className={`bg-[--bg] text-lg cursor-pointer text-white absolute right-[unset] cl:right-12 cl:top-12 top-[unset] cl:bottom-unset bottom-20 cl:left-[unset] left-1/2 !z-50  rounded-full text-center leading-9 h-9 w-9`}>
            X
          </Link>
          <div className="h-dvh w-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[--bg] rounded-full animate-spin" style={{ "--bg": bgc || '#ccc' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 flex gap-5 flex-col-reverse xl:flex-row items-start justify-center relative h-full w-full mx-auto imagem z-50">
      <div className='flex flex-col xl:w-[40%] w-full items-center self-center'>
        <div>
          <h1 className='text-3xl font-semibold text-gray-900 mt-6 cl:mt-0 cl:text-left text-center'>{image.nome}</h1>
          <h2 className='text-sm text-gray-600 cl:text-left text-center mt-1'>Categoria: {image.categoria}</h2>
        </div>
        <div className="mt-4 flex gap-4 xl:max-w-[600px] max-w-full z-50 flex-wrap p-12 place-self-center">
          {relatedImages.map((rel) => (
            <div key={rel.nome} style={{ viewTransitionName: `figures-${rel.id.split('-')[0]}` }} className="bg-gray-300 w-32 cl:h-44 h-32 cursor-pointer overflow-hidden hover:[&_img]:[scale:1.05] [clip-path:url(#squircle-mask)] [-webkit-clip-path:url(#squircle-mask)]"
              onClick={() => navigate.push(`/${slugify(image.categoria)}/${rel.id}?bgc=${encodeURIComponent(rel.colors[0])}`)}>
              <img src={rel.url} alt={rel.nome} className="w-full h-full object-cover duration-100 object-top" />
            </div>
          ))}
        </div>
      </div>

      <div className="z-10 relative xl:w-[60%] w-full min-h-dvh [view-transition-name:figure-img]" data-image={image.nome}>
        <Link href={`/${slugify(image.categoria)}`} style={{ "--bg": bgc }}
          className={`bg-[--bg] text-lg cursor-pointer text-white absolute right-[unset] cl:right-12 cl:top-12 top-[unset] cl:bottom-unset bottom-20 cl:left-[unset] left-1/2 !z-50  rounded-full text-center leading-9 h-9 w-9`}>
          X
        </Link>

        <ImageZoom
          alt={image.nome}
          src={image.url}
          zoom={200}
          fullWidth={true}
          style={{ "--shadow": image.colors[0] + 66 }}
          className={`z-0 [&_img]:mx-auto h-dvh w-full [&_img]:block [&_img]:h-dvh [&_img]:object-contain [&_img]:rounded-2xl [&_img]:!z-40 [&_img]:!w-auto [&_img]:!bg-transparent [&_img]:relative [&_img]:drop-shadow-[0_0_40px_var(--shadow)]`}
        />
        <Image
          alt={image.nome}
          src={image.url}
          width={image.width || 800}
          height={image.height || 600}
          style={{ "--shadow": image.colors[0] + 66 }}
          className={`mx-auto block h-dvh object-contain rounded-2xl !z-40 !w-auto !bg-transparent relative drop-shadow-[0_0_40px_var(--shadow)] cl:hidden`}

        />
        {logado &&
          <div className='absolute right-10 top-24 py-3 z-[999] h-24 flex flex-col justify-between px-3'>
            <button className='[&>svg_path]:fill-none [&>svg_path]:stroke-gray-800 duration-150 z-50' onClick={() => setConfirmation(true)}>
              <DeleteIcon />
            </button>

            <button className='[&>svg_path]:fill-none [&>svg_path]:stroke-gray-800 duration-150 z-50' onClick={() => { setConfirmation(true); setRen(true) }}>
              <EditIcon />
            </button>
          </div>
        }

        {confirmation && !ren &&
          <div className='fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-[999999] grid place-items-center prompt'>
            <div className='flex flex-col justify-center items-center bg-gray-200/30 backdrop-blur-md rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl'>
              <h2 className='font-semibold text-gray-50'>TEM CERTEZA?</h2>
              <div className='flex justify-center items-center gap-4'>
                <button onClick={() => { handleDelete(image.url), setConfirmation(false) }} className='bg-black px-4 py-2 text-white text-sm rounded-lg'> DELETAR</button>
                <button onClick={() => setConfirmation(false)} className='bg-white px-4 py-2 text-black text-sm rounded-lg'>CANCELAR</button>
              </div>
            </div>
          </div>
        }
        {confirmation && ren &&
          <div className='fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-[999999] grid place-items-center prompt'>
            <div className='flex flex-col justify-center items-center bg-[#444a] rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl relative backdrop-blur-md'>
              <button className='absolute right-2 top-0 text-white border-0 text-base z-50 cursor-pointer' onClick={() => setConfirmation(false)}>x</button>

              {!message &&
                <div className='flex justify-center items-center gap-4'>
                  <input onBlur={(e) => e.target.value.length > 0 ? handleRename(e.target.value) : console.log('nada alterado')}
                    placeholder={'NOVO NOME'}
                    className='bg-white/30 px-4 py-2 text-white text-sm rounded-lg placeholder:text-gray-200'
                  />
                  <button
                    onClick={() => {
                      setUpWindow(true);
                      setNova(true)
                      localStorage.setItem('urlEditar', image.url);
                    }}>
                    <ReplaceIcon />
                  </button>
                </div>}
              {message && <span>Renomeado com sucesso!</span>}
            </div>
          </div>
        }
      </div>
    </div >
  );
}