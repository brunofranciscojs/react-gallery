import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth.jsx'

export default function Logar() {
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    const entrar = async () => {
        if (!email || !senha) {
            setErro('Insira as credenciais')
            return
        }
        const res = await login(email, senha)
        if (res) {
            setErro(res)
            return
        }
        // Se sucesso, o modal fecha ou o estado muda via contexto, 
        // mas podemos limpar o erro
        setErro('')
    }

    return (
        <div className="absolute mx-auto lpt:top-0 top-12 right-0 px-5 login z-0">
            <div className='relative flex gap-1 backdrop-blur-md py-2 px-3 rounded-xl'>
                <input type="email" placeholder="email" className="px-2 py-1 rounded-md w-[180px] bg-gray-100 text-gray-800" onChange={(e) => [setEmail(e.target.value), setErro('')]} />
                <input type="password" placeholder="senha" className="px-2 py-1 rounded-md w-[120px] bg-gray-100 text-gray-800" onChange={(e) => [setSenha(e.target.value), setErro('')]} />

                <input type="submit" value="ir" onClick={entrar}
                    className="bg-gray-600 text-white py-1 rounded-md border-2 border-gray-600 border-solid duration-200 w-[40px] block
                    hover:boder-gray-600 hover:bg-transparent hover:text-gray-600 cursor-pointer"/>
            </div>
            <small className="text-red-500 w-auto block mt-1 bg-white/80 px-2 rounded">{erro}</small>
        </div>
    )
}