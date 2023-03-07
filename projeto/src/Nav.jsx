import React, { useEffect, useState } from "react";
import './Nav.css';

function Nav() {
    const [nav, setNav] = useState([])
    const ul = []
    const [activeItem, setActiveItem] = useState(null);

    const noClicque = (item) => {
        setActiveItem(item === activeItem ? null : item);
    };
    useEffect(() => {
        fetch('https://docs.google.com/spreadsheets/d/1PI9xFBRYlu6dpsF4UBkY8pWbnbWJR9cmGdXINVnOcKM/gviz/tq?')
            .then(response => { return response.text() })
            .then(json => {
                var jsonData = JSON.parse(json.substring(47).slice(0, -2));
                setNav(jsonData.table.rows)
            })
    }, [])

    const uniqueItems = new Set();

    nav.forEach((item) => {
        const className = item.c[1].v.split(' ').join('-');

        if (!uniqueItems.has(className)) {

            ul.push(<li key={item.c[1].v} className={`${className} ${item === activeItem ? 'active' : ''}`} onClick={() => noClicque(item)}>{item.c[1].v}</li>)

            uniqueItems.add(className);
        }
    });

    return (
        <nav>
            <ul key='categorias' >
                {ul}
            </ul>
        </nav>
    )
}

export default Nav