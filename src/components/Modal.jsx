export default function Modal({params:{deletar, logado, favorite, currentImageIndex, saveIcon, savedIcon, setModal, favoritar, setConfirmation, setDelURL, setDelCat, theme}}){

    return (
        
            <div className="fixed z-[60] w-full h-dvh backdrop-blur-md backdrop-saturate-[.1] backdrop-brightness-[.3] saturate-[1.3] left-0 top-0 grid place-items-center" style={{background: theme}}>
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

                    {favorite[currentImageIndex] && <button dangerouslySetInnerHTML={{__html:saveIcon}}
                            className='[&>svg_path]:fill-gray-50 hover:brightness-150 duration-100 z-50 absolute top-2 right-2'
                            onClick={() => favoritar(currentImageIndex)}>
                    </button>}

                    {!favorite[currentImageIndex] && <button dangerouslySetInnerHTML={{__html:savedIcon}}
                            className='[&>svg_path]:stroke-gray-50 [&>svg_path]:fill-none hover:brightness-150 duration-100 z-50 absolute top-2 right-2'
                            onClick={() => favoritar(currentImageIndex)}>
                    </button>}
                </div>

                <a onClick={() =>setModal(false)} 
                    className={`bg-black w-8 h-8 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-gray-300 hover:text-white md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                    <img src={currentImageIndex} className='w-auto h-[95dvh] block mx-auto rounded-3xl object-contain' />
            </div>
        
    )
}