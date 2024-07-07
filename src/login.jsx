import React, { useState } from 'react';
import useAuth from './hooks/useAuth.jsx'

export default function Logar() {
    const { login } = useAuth()

    const [usuario, setUsuario] = useState()
    const [senha, setSenha] = useState()
    const [erro, setErro] = useState()

    const entrar = async () =>{
        if(!usuario | !senha){
            setErro('Insira as credenciais')
            return
        }
        const res = await login(usuario, senha)
        if(res){
            setErro(res)
            return
        }
    }

    return (
        <div className="absolute mx-auto top-20 right-0 px-5 login opacity-0 -translate-y-10">
            <div className='relative flex gap-1 bg-white py-2 px-3 rounded-xl shadow-lg'>
                <input type="text" placeholder="usuario" className="px-2 py-1 rounded-md w-[120px] bg-gray-100 text-gray-800" onChange={(e) => [setUsuario(e.target.value), setErro('')]}/>
                <input type="password" placeholder="senha" className="px-2 py-1 rounded-md w-[120px] bg-gray-100 text-gray-800" onChange={(e) => [setSenha(e.target.value), setErro('')]}/>

                <input type="submit" value="ir" onClick={entrar}
                    className="bg-gray-600 text-white py-1 rounded-md border-2 border-gray-600 border-solid duration-200 w-[40px] block
                    hover:boder-gray-600 hover:bg-transparent hover:text-gray-600 cursor-pointer"/>
            </div>
            <small className="text-red-500 w-auto">{erro}</small>
        </div>
    )
}