import React, { createContext, useEffect, useState } from "react";
import { supabase } from './supabaseClient';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLogado(!!session);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLogado(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Erro ao fazer login:", error.message);
            return error.message; // Return error message to display
        }

        // Login successful, state updates via onAuthStateChange
        return null;
    };

    const sair = async () => {
        await supabase.auth.signOut();
        // State updates via onAuthStateChange
    };

    return (
        <AuthContext.Provider value={{ user, logado, login, sair }}>
            {children}
        </AuthContext.Provider>
    );
};
