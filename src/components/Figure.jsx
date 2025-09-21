import useAuth from '../hooks/useAuth'
import DeleteIcon from './DeleteIcon'
import EditIcon from './EditIcon'
import { useState } from 'react';
import { supabase } from '../contexto/supabaseClient';
import ReplaceIcon from './ReplaceIcon';
import { useNavigate } from 'react-router-dom';


export default function Figure({ url, cat, index, name, colors, setDcolor, setUpWindow, setNova, id, array }) {
    const { logado } = useAuth();
    const [confirmation, setConfirmation] = useState(false);
    const [ren, setRen] = useState(false);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();

    const slugify = (text) =>{
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
    return (
        <>
            <svg class="hidden" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="SquircleClip2" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0.5
                            C 0,0.0575  0.0575,0  0.5,0
                            0.9425,0  1,0.0575  1,0.5
                            1,0.9425  0.9425,1  0.5,1
                            0.0575,1  0,0.9425  0,0.5"></path>
                    </clipPath>
                </defs>
            </svg>
            <figure className={`item grid place-items-center group rounded-full shadow-none relative group backdrop-blur-sm bg-[--bg] [corner-shape:squircle]`} data-bg={colors[0]} style={{"--cor":colors[0],"--bg":colors[0]+22}}>

                {logado &&
                    <>
                        <button className='absolute top-7 left-4 [&>svg_path]:fill-none [&>svg_path]:stroke-gray-800 duration-150 opacity-0 group-hover:opacity-100 z-50' onClick={() => setConfirmation(true)}>
                            <DeleteIcon />
                        </button>
        
                        <button className='absolute top-7 right-4 [&>svg_path]:fill-none [&>svg_path]:stroke-gray-800 duration-150 opacity-0 group-hover:opacity-100 z-50' onClick={() => {setConfirmation(true); setRen(true)}}>
                            <EditIcon />
                        </button>
                    </>
                }
                <img src={url} onClick={() => {navigate(`/${slugify(cat)}/${id}`), setDcolor(colors[0])}} loading="lazy" decoding="async" />

                <figcaption className='flex flex-col justify-end text-left'>
                    <fieldset>
                        <legend className="text-xs leading-none">{cat}</legend>
                        <span className='text-base text-gray-50 font-semibold !leading-[1] block text-balance'>{name}</span>
                    </fieldset>
                </figcaption>
            </figure>

            {confirmation && !ren &&
                <div className='fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-[999999] grid place-items-center prompt'>
                    <div className='flex flex-col justify-center items-center bg-gray-200/30 backdrop-blur-md rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl'>
                        <h2 className='font-semibold text-gray-50'>TEM CERTEZA?</h2>
                        <div className='flex justify-center items-center gap-4'>
                            <button onClick={() => { handleDelete(url), setConfirmation(false) }} className='bg-black px-4 py-2 text-white text-sm rounded-lg'> DELETAR</button>
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
                            <input onBlur={(e) =>e.target.value.length > 0 ? handleRename(e.target.value) : console.log('nada alterado')} 
                                   placeholder={'NOVO NOME'} 
                                   className='bg-white/30 px-4 py-2 text-white text-sm rounded-lg placeholder:text-gray-200' 
                            />
                            <button 
                               onClick={()=>{
                                setUpWindow(true); 
                                setNova(true)
                                localStorage.setItem('urlEditar', url);
                              }}>
                            <ReplaceIcon/>
                            </button>
                        </div>}
                        {message && <span>Renomeado com sucesso!</span>}
                    </div>
                </div>
            }
        </>
    );
};