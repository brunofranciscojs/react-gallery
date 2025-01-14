export default function Figure({ url, cat, logado, abrirModal, deletar, setConfirmation, setDelURL, setDelCat, index }) {

    return (
        <figure className={`item ${cat.toLowerCase()} [&:has(img:hover)_button]:opacity-100 [&:has(button:hover)_button]:opacity-100 grid place-items-center`}>
            {logado && (
                <button
                    className='absolute top-1 left-1 opacity-0 z-[70] shadow-sm px-1 py-1 rounded [&>svg_path]:fill-none [&>svg_path]:stroke-gray-500 hover:[&>svg_path]:fill-gray-500 duration-300'
                    dangerouslySetInnerHTML={{ __html: deletar }}
                    title='deletar'
                    onClick={() => {
                        setConfirmation(true);
                        setDelURL(url);
                        setDelCat(cat);
                    }}
                ></button>
            )}

            <img
                src={url}
                style={{ transitionDelay: `${index * 35}ms` }}
                onClick={() => abrirModal(url) }
            />

            <figcaption className='flex flex-col justify-end text-left '>
                <span className='text-base text-gray-200 font-semibold leading-none'>{cat}</span>

            </figcaption>
        </figure>
    );
};
