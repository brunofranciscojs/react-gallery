import { useState } from "react";
import { uploadFn } from "@/lib/ImagesDB";
import SpinIcon from "@/components/SpinIcon";
import { supabase } from '@/lib/supabaseClient';
import Compressor from "compressorjs";
import { useAppContext } from '@/contexts/AppContext';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(0);
  const [hasImage, sethasImage] = useState(false)
  const [preview, setPreview] = useState('')
  const { upWindow, setUpWindow, nova, setNova, categories, slugify } = useAppContext();

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFile(files);
    if (event.target.files && event.target.files[0]) {
      const arquivo = new FileReader()
      arquivo.onload = fileLoaded
      arquivo.readAsDataURL(event.target.files[0])
    }
    sethasImage(true)
  };

  const fileLoaded = event => setPreview(event.target.result)

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleUpload = async () => {
    const categoriaAtual = nova ? localStorage.getItem('categoria') : category;

    if (!file?.[0] || !categoriaAtual) {
      alert("Por favor, selecione um arquivo e uma categoria.");
      return;
    }

    setUploading(1);

    if (nova) {
      const urlEditar = localStorage.getItem('urlEditar');
      const filePathOld = urlEditar.split('/ilustras/')[1];


      new Compressor(file[0], {
        quality: 0.7,
        convertSize: 1,
        success: async (compressed) => {
          const timestamp = Date.now();
          const mimeExt = compressed.type.split('/')[1];
          const ext = mimeExt === 'jpeg' ? 'jpg' : mimeExt;
          const novoFilePath = `${categoriaAtual}/${timestamp}.${ext}`;

          const img = new Image();
          img.src = URL.createObjectURL(compressed);
          await img.decode();
          const { naturalWidth: width, naturalHeight: height } = img;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("ilustras")
            .upload(novoFilePath, compressed, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) {
            console.error("Erro ao fazer upload da nova imagem:", uploadError);
            setUploading(0);
            return;
          }

          localStorage.removeItem(`imagens-${categoriaAtual}`);
          const novaUrl = `https://utyaegtlratnhymumqjm.supabase.co/storage/v1/object/public/ilustras/${novoFilePath}`;

          const { error: dbError } = await supabase
            .from('imagens')
            .update({ url: novaUrl, width, height })
            .eq('url', urlEditar);

          if (dbError) {
            console.error("Erro ao atualizar URL no banco:", dbError);
            setUploading(0);
            return;
          }

          console.log("URL atualizada com sucesso!");
          setTimeout(() => {
            setUploading(2);
          }, 1500);
        },
        error(err) {
          console.error("Erro ao comprimir:", err.message);
          setUploading(0);
        },
      });

    } else {
      if (file.length > 0) {
        const compressedFiles = await Promise.all(
          [...file].map(f =>
            new Promise((resolve, reject) => {
              new Compressor(f, {
                quality: 0.7,
                convertSize: 1,
                success: async (compressed) => {
                  const img = new Image();
                  img.src = URL.createObjectURL(compressed);
                  await img.decode();
                  resolve({
                    file: compressed,
                    width: img.naturalWidth,
                    height: img.naturalHeight
                  });
                },
                error: reject,
              });
            })
          )
        );

        const result = await uploadFn(compressedFiles, categoriaAtual);
        console.log("Arquivos enviados com sucesso:", result);
        setTimeout(() => {
          setUploading(2);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col add items-center justify-center right-5 fixed top-0 left-0 bg-[#000000cc] w-full h-dvh backdrop-blur-md z-[999]">
      <button className='text-white z-30' onClick={() => { uploading ? window.location.reload() : setUpWindow(false) }} >X</button>
      <div className='flex gap-5'>
        {!hasImage &&
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="p-28 bg-[#ffffff22] border-4 border-dashed border-gray-500 rounded-lg mt-2 [&::file-selector-button]:opacity-0  max-w-[520px] w-full text-transparent 
                    before:content-['DRAG_&_DROP'] before:text-white before:flex before:justify-center" />
        }
        {hasImage && preview &&
          <div className='flex flex-col'>
            <img src={preview} className='block w-96 h-96 object-contain' />
            <button className='text-center text-gray-200 block py-3'
              onClick={() => sethasImage(false)}>
              escolher outra
            </button>
          </div>
        }
      </div>

      <div className="p-4 rounded-md shadow-md w-80">
        <input type="text" style={{ display: nova ? 'none' : 'flex' }}
          placeholder={'D I G I T E  A  C A T E G O R I A'} required onChange={handleCategoryChange}
          className='bg-white/10 border py-2 px-5 max-w-[520px] w-full outline-none mx-3 text-gray-200  text-center'
        />

        <br /><br />
        <button className='text-gray-200 duration-200' onClick={handleUpload} disabled={uploading}>

          {uploading == 0 && "Enviar"}
          {uploading == 1 && <span className={`animate-spin flex items-center duration-200 transition-all invert`}><SpinIcon /></span>}
          {uploading == 2 && "Upload Completo!"}
        </button>
      </div>
    </div>
  );
}

export default UploadForm;
