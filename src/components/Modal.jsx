import ImageZoom from "react-image-zooom";
import MirrorIcon from "./MirrorIcon";
import { useState } from "react";

const Modal = ({params:{ setModal, dColor, openedImage }}) => {
    const [mirror, setMirror] = useState(false)
    return (
        <>
            <div className="fixed z-[90] w-full h-dvh left-0 top-0 grid place-items-center modal cl:p-8 p-0 bg-[#5557] backdrop-blur-sm backdrop-grayscale-[1] backdrop-brightness-[.8] [&_figure]:![background-color:transparent] [&_figure]:cl:block [&_figure]:hidden" style={{ "--dColor":dColor+'cc'}}>
                <img src={openedImage} className={`duration-100 w-auto h-[99dvh] object-contain z-10 mx-auto cl:hidden block [anchor-name:--mirror2] ${mirror ? '[scale:-1_1]' : ''}`} />
                <ImageZoom 
                    zoom={120} 
                    fullWidth={true} 
                    src={openedImage} 
                    className={`${mirror ? '[scale:-1_1]' : ''} [&_img]:w-auto [&_img]:h-[99dvh] [&_img]:object-contain z-10 [&_img]:mx-auto !w-full duration-100 [anchor-name:--mirror]`} 
                />
                <div className="flex gap-4 sm:flex-col flex-row-reverse bg-[--dColor] backdrop-brightness-[.01] saturate-[3] p-2 items-center absolute z-50 cl:[position-anchor:--mirror] [position-anchor:--mirror2] [position-area:y-end_center] sm:-translate-x-12 translate-x-0 sm:translate-y-20 -translate-y-20 sm:[position-area:y-start_x-end]">
                    <a onClick={()=>setModal(false)} className={`leading-none text-xl cursor-pointer text-white`}>X</a>
                    <button className="[&_path]:fill-white [&_svg]:w-8 [&_svg]:h-8" onClick={()=> setMirror(pM => !pM)}>
                        <MirrorIcon/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Modal