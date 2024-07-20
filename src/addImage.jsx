import Compressor from 'compressorjs';
import { ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { images } from "./firebaseData";
import useAuth from './hooks/useAuth.jsx'
import Logar from "./login.jsx";

 export default function Upload({setupWindow, upWindow}) {

    const [percent, setPercent] = useState(0)
    const [compressedFile, setCompressedFile] = useState(null)
    const [categoria, setCategoria] = useState('')
    const { logado, sair } = useAuth()
    const [hasImage, sethasImage] = useState(false)
    const [logar, setLogar] = useState(false)
    const [preview, setPreview] = useState('')
    const loadSpin = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>`
    const [spin, setSpin] = useState(false)

    function handleChange(event) {
        const image = event.target.files[0];

        if(event.target.files && event.target.files[0]){
            const arquivo = new FileReader()
            arquivo.onload = fileLoaded
            arquivo.readAsDataURL(event.target.files[0])
        }
        
        sethasImage(true)
        

        new Compressor(image, {
            quality: 0.7,
            mimeType: "image/webp",
            resize: "contain",
            width: '1000',
            success: (compressedResult) => {
                setCompressedFile(compressedResult)
            },
        });
    }
    const fileLoaded = event => setPreview(event.target.result)
    const generateId = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
            counter += 1;
        }
        return result
    }
    const handleUpload = () => {
            setSpin(true)
        if (!compressedFile) {
            alert('erro');
            return;
        }
        const storageRef = ref(images, `${categoria}/${categoria}-${generateId(categoria.length)}.webp`);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        uploadTask.on("state_changed",
            (snapshot) => {
                const percento = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setPercent(percento)
                setTimeout(() =>{
                    if(percento > 99){
                        setSpin(false)
                    }
                },2000)
            })

    }
    
    if (!logado) {
        return (
                <>
                    <span className='flex flex-row add items-center absolute top-0 right-6'>
                        <button className='log text-2xl cursor-pointer text-gray-700 z-50 relative top-2' onClick={() => { setLogar(true) }}> + </button>
                        {logar && <>
                            <button className='log text-2xl cursor-pointer text-gray-700 z-50 absolute md:top-[4rem] md:-left-[21rem] top-[6px] -left-1 backdrop-blur px-2' 
                                    onClick={() => {setLogar(false)}}>
                                        x
                            </button>
                            <Logar />
                            </>
                        }
                   </span>
                </>
        )
    }

    return ( 
         
        logado && upWindow && (
            <span className="flex flex-row add items-center right-5 fixed top-0 left-0 bg-[#000000cc] w-full h-full backdrop-blur-md z-40">
                    
                <div className='addinputs flex flex-col items-center relative left-1/2 -translate-x-1/2'>
                    <button className='text-white z-30' onClick={() =>{ percent > 99 ? window.location.reload() : setupWindow(false) } }>X</button>
                    
                        <div className='flex gap-5'>
                            {!hasImage && 
                                <input  type="file" 
                                    onChange={handleChange} 
                                    accept="/image/*" id="files" placeholder={"Escolher"}
                                    className="p-28 bg-[#ffffff22] border-4 border-dashed border-gray-500 rounded-lg mt-2 [&::file-selector-button]:opacity-0  max-w-[520px] w-full text-transparent 
                                               before:content-['DRAG_&_DROP'] before:text-white before:flex before:justify-center"
                                    />}
    
                            {hasImage &&   
                                    <div className='flex flex-col'>
                                        <img src={preview} className='block w-96 '/>
                                        <button className='text-center text-gray-200 block py-3' onClick={() => sethasImage(false)}>escolher outra</button>
                                    </div>
                            }
                            
                        </div>
                        <input type="text" placeholder='D I G I T E  A  C A T E G O R I A' required
                                className='border-[#888] bg-transparent border py-2 px-5 max-w-[520px] w-full outline-none mx-3 text-gray-200 border-l-0 border-r-0 border-t-0 text-center' 
                                onChange={(e) => { setCategoria(e.target.value.toLowerCase()) }}
                        />
                        <br /><br />
                        <button className='ml-1 text-gray-200 duration-200' onClick={handleUpload} disabled={categoria.length > 1 ? false : true} style={{cursor:categoria.length < 1 ? 'not-allowed' : 'pointer'}}>ENVIAR</button>
                    
                    {percent > .9 && categoria.length > 0 && spin &&
                                <span className={`animate-spin dark:text-gray-300 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 flex items-center gap-2 dark:[&_svg]:invert hover:[&_svg]:stroke-gray-100 duration-200 transition-all`} 
                                        dangerouslySetInnerHTML={{__html:loadSpin}}></span>}
                    {percent > 99 && !spin && <span className='dark:text-gray-300 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500'>enviado com sucesso!</span>}
                </div>
            </span>
        )
 );
}

