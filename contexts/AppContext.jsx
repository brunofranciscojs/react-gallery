"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { slugify } from '@/lib/utils';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Initialize with 'misc' to avoid hydration mismatch, or handle it in useEffect
    const [categoria, setCategoria] = useState('misc');
    const [upWindow, setUpWindow] = useState(false);
    const [nova, setNova] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Client-side only initialization
        const storedCategory = localStorage.getItem('categoria');
        if (storedCategory) {
            setCategoria(storedCategory);
        }
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('imagens')
                .select('categoria');

            if (error) {
                console.error('Error fetching categories:', error);
                return;
            }
            const uniqueCategories = [...new Set(data.map(item => item.categoria))];
            setCategories(uniqueCategories);
        };

        fetchCategories();
    }, []);

    return (
        <AppContext.Provider value={{
            categoria,
            setCategoria,
            upWindow,
            setUpWindow,
            nova,
            setNova,
            categories,
            slugify
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
