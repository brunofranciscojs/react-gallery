import { GlassCard } from '@developer-hub/liquid-glass'

const Modal = ({params:{ setModal, dColor, openedImage }}) => {

    return (
        <>
            <svg width="0" height="0">
                <filter id="kill">
                    <feColorMatrix type="matrix" 
                    result="red_"             
                    values="4 0 0 0 0
                            0 0 0 0 0 
                            0 0 0 0 0 
                            0 0 0 1 0"/>
                    <feOffset in="red_" dx="0" dy="0" result="red"/>
                    <feColorMatrix type="matrix" 
                    in="SourceGraphic"             
                    result="blue_"             
                    values="0 0 0 0 0
                            0 3 0 0 0 
                            0 0 10 0 0 
                            0 0 0 1 0"/>
                    <feOffset in="blue_" dx="0" dy="0" result="blue"/>    
                    <feBlend mode="screen" in="red" in2="blue"/>

                </filter>
            </svg>

            <div className="fixed z-[90] w-full h-dvh left-0 top-0 grid place-items-center modal bg-black/25 [&_.glass]:!rounded-3xl" style={{"--dColor":dColor+'cc'}}>
                <GlassCard
                    displacementScale={700}
                    blurAmount={0.0}
                    cornerRadius={60}
                    className="!w-full h-dvh grid place-content-center rounded-3xl mx-auto"
                    width="100%"
                    >
                
                    <a onClick={()=>setModal(false)} style={{"--dColor":dColor}}
                            className={`leading-none cursor-pointer absolute z-50  text-white hover:text-white md:top-3 md:right-4 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                    <img src={openedImage} className='block w-full h-[90dvh] saturate-150 absolute left-0 top-0 mix-blend-darken z-10 [-webkit-filter:url(#kill)]' />
                    <img src={openedImage} className='block w-full h-[90dvh] saturate-150 border-2 border-white/40 border-b-black/20 border-r-black/20 ' />
                </GlassCard>

                
            </div>
        </>
    )
}

export default Modal