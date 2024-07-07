import React, { createContext, useEffect, useState } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseData';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState()
    const [infos, setInfos] = useState([])

    const [logado, setLogado] = useState(() => {
        const savedLogado = localStorage.getItem('logado');
        return savedLogado ? JSON.parse(savedLogado) : 0;
    })
    useEffect(() => {
        const loginInfos = async () => {
            const data = doc(db, "configuracao", "login")
            const json = await getDoc(data)
            if (json.exists()) {
                const infoData = json.data();
                if (infoData.credenciais) {
                    setInfos(infoData.credenciais);
                }
            }
        }
        loginInfos()
    }, [])

    useEffect(() =>{
        const token = localStorage.getItem('token')
        const bancoDados = localStorage.getItem('bancoDados')

        if(token && bancoDados){
            const sucesso = JSON.parse(bancoDados)?.filter(
                (user) => user.usuario === JSON.parse(token).usuario)
            if(sucesso) setUser(sucesso[0])
        }
    },[])

    const login = (usuario, senha) =>{
        const bancoDados = infos
        const sucesso = bancoDados?.filter((user) => user.usuario === usuario)

        if(sucesso?.length){
            if(sucesso[0].usuario === usuario && sucesso[0].senha === senha){
                    const token = Math.random().toString(36).substring(2)
                    localStorage.setItem('token', JSON.stringify({usuario,token}))
                    setUser({ usuario, senha })
                    setLogado(1)
                    localStorage.setItem('logado', JSON.stringify(1))
                    return
                }else{
                    return 'usuario ou senha errados'
                }
            }else{
                return 'Usuário sem conta'
            }
    }

    const sair = () =>{
        setLogado(0)
        setUser(null)
        localStorage.removeItem('logado')
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{user, logged: !!user, login, sair, logado }}>
            {children}
        </AuthContext.Provider>
    )
  
}


    
        
    
