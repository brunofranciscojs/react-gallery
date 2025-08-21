import Modal from "./Modal"


export default function Favorites({params:{openFav, modal, favorite, setViewFaves, modalFav, loadSpin, setOpenFav, deletar, eyeIcon, logado, currentImageIndex, saveIcon, savedIcon, setModal, setConfirmation,setDelURL, setDelCat, theme  }}){
    return(
 
                <div className="fixed right-0 top-0 h-dvh w-full z-50 backdrop-blur-md backdrop-saturate-0">
                    {modal && 
                        <Modal params={{ setDelURL, setDelCat, setConfirmation, logado, favorite, currentImageIndex, saveIcon, savedIcon, setConfirmation, setDelURL, theme, loadSpin, modalFav, deletar, setModal }}/>
                    }

                    <div className='dark:bg-[#131313aa] bg-[#dddddd] px-8 py-3 h-screen overflow-y-auto'>
                        <div className="flex gap-3">
                            <button onClick={() => setViewFaves(false)} className='w-5 h-5 rounded-full p-2 leading-[0] z-50 cursor-pointer'>X</button>
                        </div>

                        <div className="flex flex-wrap gap-5 justify-stretch mx-auto py-8 fav">
                            {Object.entries(favorite).map((item, index) => (
        
                                <>
                                {item[1] ? 
                                    <figure key={index} className="relative [&:has(:hover)_img]:brightness-75 duration-100 [&:has(svg:hover)_img]:brightness-50 h-full">

                                        <div className='flex gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [scale:.8] z-10'>
                                            <button dangerouslySetInnerHTML={{__html:deletar}} onClick={()=> setDelCat(item[0]) }
                                                    className="[&>svg_path]:stroke-gray-600 [&>svg_path]:fill-none hover:[&>svg]:brightness-[5] bg-gray-300/70 backdrop-blur-sm p-1 rounded"></button>
    
                                            <button dangerouslySetInnerHTML={{__html:eyeIcon}} onClick={()=> (favoriteModal(item[0]), setModal(item[0])) }
                                                    className="[&>svg_path]:stroke-gray-600 [&>svg_path]:fill-none hover:[&>svg]:brightness-[5] bg-gray-300/70 backdrop-blur-sm p-1 rounded"></button>
                                        </div>

                                        <img src={item[0]}  className="w-[130px] h-auto object-cover object-center rounded-md z-0 duration-150 bg-[#00000011]"/>
                                    </figure> : ''}
                                </>
                            ))
                        }
                        </div>
                    </div>
                </div>
    )
}