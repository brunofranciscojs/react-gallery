import ImageZoom from "react-image-zooom";
import {LGContainer} from "./FluidGlass.jsx";

const Modal = ({params:{ setModal, dColor, openedImage }}) => {

    return (
        <div className="fixed z-[90] w-full h-dvh left-0 top-0 grid place-items-center modal bg-black/25" style={{"--dColor":dColor+'cc'}}>
            <LGContainer config={{radius: 20 }}>
            <a onClick={()=>setModal(false)} style={{"--dColor":dColor}}
                className={`bg-[--dColor]  w-8 h-8 saturate-200 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-white hover:text-white md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                <ImageZoom fullWidth={true} height="100%" src={openedImage} className='!w-full [&_img]:w-auto [&_img]:h-[95dvh] [&_img]:block [&_img]:mx-auto [&_img]:rounded-3xl [&_img]:object-contain !bg-transparent h-full saturate-150' zoom="150" />
            </LGContainer>
        </div>
    )
}

export default Modal