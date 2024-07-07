import React, { createContext, useContext, useState } from "react";

const CategoriaContext = createContext();

export const useCategoria = () => useContext(CategoriaContext);

export const CategoriaProvider = ({ children }) => {
    const [categoria, setCategoria] = useState('todos');

    return (
        <CategoriaContext.Provider value={{ categoria, setCategoria }}>
            {children}
        </CategoriaContext.Provider>
    );
};
