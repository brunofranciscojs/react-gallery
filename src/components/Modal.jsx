import ImageZoom from "react-image-zooom";

const Modal = ({params:{ setModal, dColor, openedImage }}) => {

    return (
        <>
            <div className="fixed z-[90] w-full h-dvh left-0 top-0 grid place-items-center modal p-8 backdrop-brightness-50" style={{"--dColor":dColor+'cc'}}>
                <a onClick={()=>setModal(false)} className={`leading-none cursor-pointer absolute z-50  text-white hover:text-white md:top-3 md:right-4 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                <ImageZoom fullWidth={true} zoom={140} src={openedImage} className='[&_img]:block [&_img]:w-full [&_img]:h-[99dvh] [&_img]:object-contain z-10 [&_figure]:!bg-none [&_figure]:!w-full' />
            </div>
        </>
    )
}

export default Modal