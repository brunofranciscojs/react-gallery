import ImageZoom from "react-image-zooom";


export default function Modal({params:{ currentImageIndex, setModal }}){

    return (
        <div className="fixed z-[90] w-full h-dvh backdrop-blur-md backdrop-brightness-[.7] backdrop-saturate-[0] left-0 top-0 grid place-items-center">
            <a onClick={() =>setModal(false)} 
                className={`bg-black w-8 h-8 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-gray-300 hover:text-white md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]`}>X</a>
                <ImageZoom  src={currentImageIndex} className='[&_img]:w-auto [&_img]:h-[95dvh] [&_img]:block [&_img]:mx-auto [&_img]:rounded-3xl [&_img]:object-contain !bg-transparent' zoom="300"/>
        </div>
    )
}