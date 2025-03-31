export default function Figure({ url, cat, abrirModal, index, name, colors, onMouseEnter, setDcolor }) {

    return (
        <figure  className={`item grid place-items-center group shadow-none hover:shadow-[--cor] hover:shadow-2xl duration-150`} onMouseEnter={onMouseEnter} style={{"--cor":colors[0],transition: (index + 1 ) * .17 + 's'}}>
            
            <img src={url} onClick={() => {abrirModal(url); setDcolor(colors[0])}} loading="lazy" decoding="async" />
            
            <figcaption className='flex flex-col justify-end text-left'>
                <fieldset>
                    <legend className="text-xs leading-none">{cat}</legend>
                    <span className='text-base text-gray-50 font-semibold leading-none text-balance'>{name}</span>
                </fieldset>
            </figcaption>
        </figure>
    );
};