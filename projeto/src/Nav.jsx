import React from "react";
import GJson from './assets/gallery.json';
import './Nav.css';

function Nav() {
    const list = []

    GJson.forEach((cats) => {
        Object.keys(cats.categorias).forEach((key) => {
            list.push(
                <li key={key} className={cats.categorias[key].split(' ').join('-')}>{cats.categorias[key]}</li>
            )
        });
    });

    return (
        <nav>
            <ul key='categorias' >
                {list}
            </ul>
        </nav>
    )

}

export default Nav