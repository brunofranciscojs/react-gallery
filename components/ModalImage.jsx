"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import ImageZoom from 'react-image-zooom';
import useAuth from '@/hooks/useAuth'
import DeleteIcon from '@/components/DeleteIcon'
import EditIcon from '@/components/EditIcon'
import ReplaceIcon from '@/components/ReplaceIcon';
import { useAppContext } from '@/contexts/AppContext';
import { ShareIcon } from './Icons';
import { usePathname } from 'next/navigation';

export default function ModalImage({ id, url, name, width, height, colors, cat }) {
    const { logado } = useAuth();
    const [confirmation, setConfirmation] = useState(false);
    const [ren, setRen] = useState(false);
    const [message, setMessage] = useState(false);
    const { setUpWindow, setNova, slugify } = useAppContext();
    const pathname = usePathname();
    const bgc = colors?.[0] || '#ccc';

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

    const targetPath = (i, q) => `${pathname}/${i}?bgc=${q}`;

    const getSupabaseUrl = (url, w) => {
        const width = w || 800;
        return url
            .replace('/storage/v1/object/', '/storage/v1/render/image/')
            .split('?')[0] + `?width=${width}&quality=75`;
    };

    return (
        <div {...{ popover: '' }} id={id} style={{ '--bg': bgc + 99 }}
            className="!bg-[--bg] backdrop:bg-black/30 [&:popover-open]:flex gap-5 flex-col-reverse xl:flex-row items-start justify-center relative h-full w-full mx-auto imagem z-50">

            <div className="z-10 relative w-full min-h-dvh" data-image={name} style={{ "--bg": bgc, "--shadow": bgc + 66 }}>
                <button popoverTarget={id}
                    className={`!bg-[color-mix(in_srgb,var(--bg)_70%,_#000)] text-lg cursor-pointer text-white absolute right-[unset] cl:right-12 cl:top-12 top-[unset] cl:bottom-unset bottom-20 cl:left-[unset] left-1/2 !z-50 rounded-full text-center leading-9 h-9 w-9`}>
                    X
                </button>

                <ImageZoom alt={name} src={getSupabaseUrl(url, width || 800)} zoom={160} fullWidth={true}
                    className={`z-20 [&_img]:mx-auto h-dvh w-full [&_img]:block [&_img]:h-dvh [&_img]:object-contain [&_img]:rounded-2xl [&_img]:!z-40 [&_img]:!w-auto [&_img]:!bg-transparent [&_img]:relative`}
                />
                <Image alt={name} src={getSupabaseUrl(url, width || 800)} width={width || 800} height={height || 600} unoptimized
                    className={`mx-auto block h-dvh object-contain rounded-2xl !z-40 !w-auto !bg-transparent relative cl:hidden`}
                />

                <div className='absolute right-10 top-24 py-3 z-[999] flex flex-col justify-between px-3 mix-blend-difference'>
                    {logado &&
                        <>
                            <button className='[&>svg_path]:fill-none [&>svg_path]:stroke-gray-50 duration-150 !bg-[color-mix(in_srgb,var(--bg)_70%,_#000)] py-2 px-1 z-50'
                                onClick={() => setConfirmation(true)}>
                                <DeleteIcon />
                            </button>

                            <button className='[&>svg_path]:fill-none [&>svg_path]:stroke-gray-50 duration-150 !bg-[color-mix(in_srgb,var(--bg)_70%,_#000)] py-2 px-1 z-50'
                                onClick={() => { setConfirmation(true); setRen(true) }}>
                                <EditIcon />
                            </button>
                        </>
                    }
                    <button popoverTarget={`cp-${name.replace(/\s/g, '').replace('.webp', '').toLowerCase()}`}
                        style={{ anchorName: `--cp-${name.replace(/\s/g, '').replace('.webp', '').toLowerCase()}` }}
                        className='[&>svg_path]:fill-none [&>svg_path]:stroke-gray-50 duration-150 !bg-[color-mix(in_srgb,var(--bg)_70%,_#000)] py-2 px-1 z-50'
                        onClick={() => navigator.share({ title: name, text: cat, url: targetPath(id, bgc) })}>
                        <ShareIcon width={20} height={20} />
                    </button>

                </div>

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
                            <button className='absolute right-2 top-0 text-white border-0 text-base z-50 cursor-pointer'
                                onClick={() => setConfirmation(false)}>
                                x
                            </button>

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
                                            localStorage.setItem('urlEditar', url);
                                            localStorage.setItem('categoria', cat);
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