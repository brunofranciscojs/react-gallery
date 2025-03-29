import DeleteIcon from './DeleteIcon.jsx'

export default function Figure({ url, cat, logado, abrirModal, setConfirmation, setDelURL, setDelCat, index, cor, getFileNameFromUrl, setDcolor }) {

    const deletButton = () =>   {
        setConfirmation(true);
        setDelURL(url);
        setDelCat(cat);
    }

    return (
        <figure className={`item ${cat.toLowerCase()} grid place-items-center group shadow-none hover:shadow-[--cor] hover:shadow-2xl duration-150`} style={{"--cor":cor}} title={getFileNameFromUrl(url)} >
            {logado && (
                <button title='deletar' onClick={deletButton} 
                        className='absolute top-1 left-1 opacity-0 z-[70] shadow-sm px-1 py-1 group-hover:opacity-100 rounded [&>svg_path]:fill-none [&>svg_path]:stroke-gray-500 hover:[&>svg_path]:fill-gray-500 duration-300'>
                    <DeleteIcon/>
                </button>
            )}
 
            <img src={url} style={{ transitionDelay: `${index * 35}ms` }} onClick={() => { abrirModal(url); setDcolor(cor)} } loading="lazy" decoding="async"/>

            <figcaption className='flex flex-col justify-end text-left '>
                <span className='text-base text-gray-200 font-semibold leading-none'>
                    {cat}
                </span>
            </figcaption>
        </figure>
    );
};
