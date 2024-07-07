import Compressor from 'compressorjs';
import { ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { images } from "./firebaseData";
import useAuth from './hooks/useAuth.jsx'
import Logar from "./login.jsx";

 export default function Upload({}) {

    const [percent, setPercent] = useState(0)
    const upIcon = './src/assets/cloud.png'
    const choose = './src/assets/choose.png'
    const [compressedFile, setCompressedFile] = useState(null)
    const [categoria, setCategoria] = useState('')
    const { logado } = useAuth()
    const [hasImage, sethasImage] = useState(false)

    function handleChange(event) {
        const image = event.target.files[0];
        event.target.classList.add('upload')
        document.querySelector('.upload').nextElementSibling.classList.remove('hidden');
        
        new Compressor(image, {
            quality: 0.8,
            mimeType: "image/webp",
            resize: "contain",
            width: '720',
            success: (compressedResult) => {
                setCompressedFile(compressedResult)
            },
        });
    }

    const login = () => document.querySelector('.login').style.cssText = 'opacity:1; translate:0 0;' 

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
        sethasImage(true)
        if (!compressedFile) {
            alert('erro');
            return;
        }
        document.querySelector('.upload').nextElementSibling.style.display = 'none';
        const storageRef = ref(images, `${categoria}/${categoria}-${generateId(categoria.length)}.webp`);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        uploadTask.on("state_changed",
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setPercent(percent)
                percent == 100 ? setTimeout(() => { window.location.reload()}, 600) : ''
            })
    }

    if (!logado) {
        return <span className='flex flex-row add items-center absolute top-3 right-5'>
                    <button onClick={() => { login(); document.querySelector('input[type=text]').classList.remove('hidden') }} 
                            className='text-2xl cursor-pointer text-gray-700 z-50 relative'> + </button>
                            <Logar />
                </span>
    }

    return (
        logado && (
            <span className="flex flex-row add items-center absolute top-3 right-5">
                <div className='addinputs flex flex-row items-center'>
                    <input type="text" placeholder='categoria' 
                            className='border-[#888] bg-transparent border py-1 px-3 max-w-[150px] rounded-md focus:shadow-[0_0_10px_#aaaaaa77_inset] outline-none mx-3 text-gray-800' 
                            onChange={(e) => { setCategoria(e.target.value.toLowerCase()); setTimeout(() => { document.querySelector('label').classList.remove('hidden')},400); 
                            }}
                    />

                    <label htmlFor="files" className=' text-[.7rem] cursor-pointer leading-none '>
                        <img src={choose} className='w-[30px] h-[30px] ml-1 opacity-70 hover:opacity-100 duration-200' />
                    </label>

                    <input type="file" onChange={handleChange} accept="/image/*" id="files" className="up hidden"/>
                    <button src={upIcon}  className=' cursor-pointer ml-1 text-gray-500 opacity-70 hover:opacity-100 duration-200' onClick={handleUpload}> enviar</button>
                    
                    {hasImage && <small className='text-black block'>&nbsp;&nbsp;&nbsp;{percent}%</small>}
                </div>
            </span>
        )
    );
}

