import { GlassCard } from '@developer-hub/liquid-glass'

const Modal = ({params:{ setModal, dColor, openedImage }}) => {

    return (
        <>
            <div className="fixed z-[90] w-full h-dvh left-0 top-0 grid place-items-center modal p-8 backdrop-brightness-50" style={{"--dColor":dColor+'cc'}}>
                <a onClick={()=>setModal(false)} className={`leading-none cursor-pointer absolute z-50  text-white hover:text-white md:top-3 md:right-4 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                <img src={openedImage} className='block w-auto h-[90dvh] object-contain z-10' />
            </div>
        </>
    )
}

export default Modal