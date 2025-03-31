import { useState } from "react";
import { uploadFn } from "../contexto/ImagesDB";
import SpinIcon from "./SpinIcon";

function UploadForm({setupWindow}) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(0);
  const [hasImage, sethasImage] = useState(false)
  const [preview, setPreview] = useState('')

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFile(files);

    if(event.target.files && event.target.files[0]){
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
    if (file.length > 0) {
        const result = await uploadFn([...file], category);
        console.log("Arquivos enviados com sucesso:", result);
    }
    if (!file || !category) {
      alert("Por favor, selecione um arquivo e uma categoria.");
      return;
    }
    setUploading(1);
    
    const filePath = await uploadFn(file, category);
    console.log(`Imagem enviada com sucesso! Caminho: ${filePath}`);
    
    setTimeout(() =>{
      setUploading(2);
    },1500)
  };

  return (
        <div className="flex flex-col add items-center justify-center right-5 fixed top-0 left-0 bg-[#000000cc] w-full h-dvh backdrop-blur-md z-[999]">
            <button className='text-white z-30' onClick={() =>{uploading ? window.location.reload() : setupWindow(false) } } >X</button>
            <div className='flex gap-5'>
                {!hasImage && 
                    <input type="file" accept="/image/*" multiple onChange={handleFileChange} className="p-28 bg-[#ffffff22] border-4 border-dashed border-gray-500 rounded-lg mt-2 [&::file-selector-button]:opacity-0  max-w-[520px] w-full text-transparent 
                    before:content-['DRAG_&_DROP'] before:text-white before:flex before:justify-center" />
                }
                {hasImage &&   
                  <div className='flex flex-col'>
                      <img src={preview} className='block w-96 h-96 object-contain'/>
                      <button className='text-center text-gray-200 block py-3' onClick={() => sethasImage(false)}>escolher outra</button>
                  </div>
                }
            </div>

            <div className="p-4 rounded-md shadow-md w-80">
                <input type="text" placeholder='D I G I T E  A  C A T E G O R I A' required onChange={handleCategoryChange}
                        className='bg-white/10 border py-2 px-5 max-w-[520px] w-full outline-none mx-3 text-gray-200  text-center'/>

                <br /><br />

                <button className='text-gray-200 duration-200' onClick={handleUpload} disabled={uploading}>

                  {uploading == 0 && "Enviar"}
                  {uploading == 1 && <span className={`animate-spin flex items-center duration-200 transition-all invert`}><SpinIcon/></span>}
                  {uploading == 2 && "Upload Completo!"}
                </button>
            </div>
    </div>
  );
}

export default UploadForm;
