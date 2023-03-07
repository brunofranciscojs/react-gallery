import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import './mansonry.css';

Modal.setAppElement('#root');

function Mansonry() {

    function closeModal() { setSelectedImage(null); setIsOpen(false); }
    function openModal(img) { setSelectedImage(img); setIsOpen(true); }

    const [modalIsOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const blocks = []

    useEffect(() => {
        fetch('https://docs.google.com/spreadsheets/d/1PI9xFBRYlu6dpsF4UBkY8pWbnbWJR9cmGdXINVnOcKM/gviz/tq?')
            .then(response => { return response.text() })
            .then(json => {
                var jsonData = JSON.parse(json.substring(47).slice(0, -2));
                setFiles(jsonData.table.rows)
            })

    }, [])

    files.forEach(async (img) => {

        blocks.push(
            <figure key={`${img.c[3].v}`} className={`item ${img.c[1].v.split(' ').join('-')} ${img.c[3].v}`} onClick={() => openModal(img)}>
                {<img loading="lazy" width='100%' height='100%' alt={img.c[1].v.split(' ').join('-')} src={`https://drive.google.com/uc?export=view&id=${img.c[3].v}`} />}
                <figcaption>{img.c[1].v}</figcaption>
            </figure>
        );
    });

    return (
        <div className='mansonry' key="mansonry">
            {blocks}{
                document.querySelectorAll('ul li').forEach(item => {
                    item.addEventListener('click', function () {

                        if (item.innerHTML === 'Todos') {
                            document.querySelectorAll(`figure`).forEach(pic => {
                                pic.classList.add('item')
                            })
                        } else {
                            document.querySelectorAll(`figure`).forEach(figure => {

                                if (figure.classList.contains(item.innerHTML.split(' ').join('-'))) {
                                    figure.classList.add('item')
                                } else if (!figure.classList.contains(item.innerHTML.split(' ').join('-'))) {
                                    figure.classList.remove('item')
                                }
                            })
                        }
                    })
                })
            }

            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={closeModal}>

                <button onClick={closeModal} className="fechar">X</button>
                <img loading="lazy" width='100%' height='100%' src={selectedImage ? `https://drive.google.com/uc?export=view&id=${selectedImage.c[3].v}` : null}
                    style={{
                        borderRadius: '20px',
                        pointerEvents: 'none',
                        position: 'absolute',
                        inset: '50% 50%',
                        translate: '-50% -47%',
                        width: 'auto',
                        objectFit: 'cover',
                        height: '90%'
                    }} />
            </Modal>
        </div>
    );
}

export default Mansonry