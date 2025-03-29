import ImageZoom from "react-image-zooom";


export default function Modal({params:{ currentImageIndex, setModal, dColor }}){

    return (
        <div className="fixed z-[90] w-full h-dvh backdrop-brightness-[.3] backdrop-saturate-[0] left-0 top-0 grid place-items-center bg-[--dColor]" style={{"--dColor":dColor+'cc'}}>
            <a onClick={() =>setModal(false)} style={{"--dColor":dColor}}
                className={`bg-[--dColor] saturate-200 invert w-8 h-8 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-black hover:text-white md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                <ImageZoom  src={currentImageIndex} className='[&_img]:w-auto [&_img]:h-[95dvh] [&_img]:block [&_img]:mx-auto [&_img]:rounded-3xl [&_img]:object-contain !bg-transparent' zoom="300"/>
        </div>
    )
}