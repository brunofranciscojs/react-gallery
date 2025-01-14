import ImageZoom from "react-image-zooom";


export default function Modal({params:{ deletar, logado, currentImageIndex, setModal, setConfirmation, setDelURL, setDelCat, theme, pastinha }}){

    return (
        
            <div className="fixed z-[90] w-full h-dvh backdrop-blur-md backdrop-brightness-[.2] saturate-[1.3] left-0 top-0 grid place-items-center" style={{background:theme}}>
                <div className='absolute bottom-16 backdrop-blur-sm flex justify-center'>
                    {logado && (
                        <button className='absolute top-1 left-1 opacity-1 z-50 shadow-sm px-1 py-1 rounded [&>svg_path]:fill-none [&>svg_path]:stroke-gray-50 hover:[&>svg_path]:fill-gray-500 duration-300' 
                                dangerouslySetInnerHTML={{__html: deletar}} title='deletar'
                                onClick={() => { 
                                    setConfirmation(true), 
                                    setDelURL(currentImageIndex), 
                                    setDelCat(pastinha.cat) 
                                }}>
                        </button>
                    )}

                </div>

                <a onClick={() =>setModal(false)} 
                    className={`bg-black w-8 h-8 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-gray-300 hover:text-white md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                    <ImageZoom  src={currentImageIndex} className='[&_img]:w-auto [&_img]:h-[95dvh] [&_img]:block [&_img]:mx-auto [&_img]:rounded-3xl [&_img]:object-contain !bg-transparent' zoom="200"/>
            </div>
        
    )
}