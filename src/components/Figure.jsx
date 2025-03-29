import { useState } from 'react';
import DeleteIcon from './DeleteIcon.jsx';
import { renameFile } from '../contexto/utils.jsx';
import EditIcon from './EditIcon.jsx';

export default function Figure({ url, cat, logado, abrirModal, setConfirmation, setDelURL, setDelCat, index, cor, getFileNameFromUrl, setDcolor, onMouseEnter }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(decodeURI(getFileNameFromUrl(url, cat)));

    const deletButton = () => {
        setConfirmation(true);
        setDelURL(url);
        setDelCat(cat);
    };

    const handleRename = async () => {
        if (newName.trim() === '' || newName === decodeURI(getFileNameFromUrl(url, cat))) return;
        const folderPath = url.substring(0, url.lastIndexOf('/'));
        const newFileName = `${newName}`;
        await renameFile(url, newFileName);
        setIsEditing(false);
    };

    return (
        <figure className={`item ${cat.toLowerCase()} grid place-items-center group shadow-none hover:shadow-[--cor] hover:shadow-2xl duration-150`} style={{"--cor": cor}} onMouseEnter={onMouseEnter}>
            {logado && (
                <div className='absolute top-1 left-1 flex gap-1 opacity-0 z-[70] group-hover:opacity-100 duration-300'>
                    <button title='Editar' onClick={() => setIsEditing(true)} 
                            className='px-1 py-1 [&>svg_path]:fill-none [&>svg_path]:stroke-gray-500 hover:[&>svg_path]:fill-gray-500'>
                        <EditIcon/>
                    </button>
                    <button title='deletar' onClick={deletButton} 
                            className='px-1 py-1 [&>svg_path]:fill-none [&>svg_path]:stroke-gray-500 hover:[&>svg_path]:fill-gray-500'>
                        <DeleteIcon/>
                    </button>
                </div>
            )}
            
            <img src={url} style={{ transitionDelay: `${index * 35}ms` }} onClick={() => { abrirModal(url); setDcolor(cor) }} loading="lazy" decoding="async"/>
            
            <figcaption className='flex flex-col justify-end text-left'>
                {isEditing ? (
                    <input
                        type='text'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        className='text-base text-gray-50 font-semibold bg-transparent border-b border-gray-400 focus:outline-none'
                        autoFocus
                    />
                ) : (
                    <span className='text-base text-gray-50 font-semibold leading-none'>{newName.replace('%26','&')}</span>
                )}
            </figcaption>
        </figure>
    );
};