import React, { createContext, useEffect, useState } from "react";
import { supabase } from './supabaseClient';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [logado, setLogado] = useState(() => {
        const savedLogado = localStorage.getItem('logado');
        return savedLogado ? JSON.parse(savedLogado) : '';
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const bancoDados = localStorage.getItem('bancoDados');

        if (token && bancoDados) {
            const sucesso = JSON.parse(bancoDados)?.filter(
                (user) => user.usuario === JSON.parse(token).usuario
            );
            if (sucesso) setUser(sucesso[0]);
        }
    }, []);

    const login = async (usuario, password) => {
        const { data, error } = await supabase
            .from('settings')
            .select('usuario, password')
            .eq('usuario', usuario)
            .single();

        if (error) {
            console.error("Erro ao buscar usuário:", error);
            return 'Erro ao buscar o usuário';
        }

        if (data) {
            if (data.password === password) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem('token', JSON.stringify({ usuario, token }));
                setUser({ usuario, password });
                setLogado('1');
                localStorage.setItem('logado', JSON.stringify(1));
                return;
            } else {
                return 'Usuário ou password errados';
            }
        } else {
            return 'Usuário não encontrado';
        }
    };

    const sair = () => {
        setLogado('');
        setUser(null);
        localStorage.removeItem('logado');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, logged: !!user, login, sair, logado }}>
            {children}
        </AuthContext.Provider>
    );
};
