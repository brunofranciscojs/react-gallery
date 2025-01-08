export default function Figure({ url, cat, colors, timeCreated, logado, favoritar, favorite, abrirModal, deletar, setConfirmation, setDelURL, setDelCat, cachedImages, index, saveIcon, dataUpload, savedIcon }) {
    const cachedImage = cachedImages[url];
    return (
        <figure
            className={`item ${cat.toLowerCase()} [&:has(img:hover)_button]:opacity-100 [&:has(button:hover)_button]:opacity-100 grid place-items-center`}
            style={{ color: colors[url] }}
            data-color={`${colors[url]}75`}
        >
            {logado && (
                <button
                    className='absolute top-1 left-1 opacity-0 z-50 shadow-sm px-1 py-1 rounded [&>svg_path]:fill-none [&>svg_path]:stroke-gray-500 hover:[&>svg_path]:fill-gray-500 duration-300'
                    dangerouslySetInnerHTML={{ __html: deletar }}
                    title='deletar'
                    onClick={() => {
                        setConfirmation(true);
                        setDelURL(url);
                        setDelCat(cat);
                    }}
                ></button>
            )}

            {cachedImage ? (
                <img
                    src={cachedImage}
                    style={{ transitionDelay: `${index * 35}ms` }}
                    onClick={(e) => {
                        abrirModal(url);
                        setTheme(e.target.closest('figure').dataset.color);
                    }}
                />
            ) : (
                <div className="placeholder-loading"></div>
            )}

            <figcaption className='flex flex-col justify-end text-left '>
                <span className='text-base text-gray-200 font-semibold leading-none'>{cat}</span>
                <time className='text-[.6rem] text-gray-300 leading-none'>
                    enviado: {dataUpload(timeCreated)}
                </time>
            </figcaption>

            {favorite[url] ? (
                <button
                    dangerouslySetInnerHTML={{ __html: saveIcon }}
                    className='[&>svg_path]:fill-gray-500 hover:brightness-150 duration-100 z-50 absolute top-2 right-2'
                    onClick={() => favoritar(url)}
                ></button>
            ) : (
                <button
                    dangerouslySetInnerHTML={{ __html: savedIcon }}
                    className='[&>svg_path]:stroke-gray-500 [&>svg_path]:fill-none hover:brightness-150 duration-100 z-50 absolute top-2 right-2'
                    onClick={() => favoritar(url)}
                ></button>
            )}
        </figure>
    );
};
