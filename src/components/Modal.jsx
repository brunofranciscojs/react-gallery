import ImageZoom from "react-image-zooom";

export default function Modal({params:{ setModal, dColor, openedImage }}){

    return (
        <div className="fixed z-[90] w-full h-dvh backdrop-brightness-[.3] backdrop-saturate-[0] left-0 top-0 grid place-items-center bg-[--dColor]" style={{"--dColor":dColor+'cc'}}>
            <a onClick={() =>setModal(false)} style={{"--dColor":dColor}}
                className={`bg-[--dColor] saturate-200 brightness-50 w-8 h-8 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-white hover:text-white md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                <ImageZoom fullWidth={true} height="100%" src={openedImage} className='!w-full [&_img]:w-auto [&_img]:h-[95dvh] [&_img]:block [&_img]:mx-auto [&_img]:rounded-3xl [&_img]:object-contain !bg-transparent h-full' zoom="150" />
        </div>
    )
}