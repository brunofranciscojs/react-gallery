

export default function Favorites({params:{openFav, favorite, setViewFaves, modalFav, setOpenFav, deletar, eyeIcon, favoritar, favoriteModal }}){
    return(
 
                <div className="fixed right-0 top-0 h-dvh w-full z-50 backdrop-blur-md backdrop-saturate-0">
                    {openFav && 
                        <div className='fixed top-0 left-0 bg-[#000000cc] backdrop-blur-sm z-50 w-screen h-dvh p-5'>
                            <a onClick={() => setOpenFav(false)} 
                            className={`bg-white w-8 h-8 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-gray-900 hover:text-black md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                            <img src={modalFav} className='w-auto h-full mx-auto rounded-lg translate-y-8' />
                        </div>
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
                                            <button dangerouslySetInnerHTML={{__html:deletar}} onClick={()=> favoritar(item[0]) }
                                                    className="[&>svg_path]:stroke-gray-600 [&>svg_path]:fill-none hover:[&>svg]:brightness-[5] bg-gray-300/70 backdrop-blur-sm p-1 rounded"></button>
    
                                            <button dangerouslySetInnerHTML={{__html:eyeIcon}} onClick={()=> favoriteModal(item[0]) }
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