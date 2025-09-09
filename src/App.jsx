import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';
import { supabase } from './contexto/supabaseClient'; 
import Imagem from './components/Imagem.jsx';

export default function App() {
  const [categoria, setCategoria] = useState(localStorage.getItem('categoria') || 'misc');
  const [upWindow, setUpWindow] = useState(false);
  const [nova, setNova] = useState(false);
  const [categories, setCategories] = useState([]);

  const slugify = (text) =>{
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('imagens')
        .select('categoria');
      
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }
      setCategories(data.map(cat => cat.categoria));
    };

    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${categoria}`} />} />
          {categories.map(cat => {
              const slug = slugify(cat);

              return (
                <Route 
                  key={slug} 
                  path={`/${slug}`} 
                  element={
                    <Mansonry 
                      category={cat}
                      upWindow={upWindow} 
                      setUpWindow={setUpWindow}
                      setNova={setNova}
                    />
                  }
                />
              );
            })}
          <Route path="/:category/:imageId" element={<Imagem />} />
        </Routes>

        <footer className="text-left text-gray-700 dark:text-gray-400 pt-20 text-sm pl-2 z-0 max-w-[300px] absolute bottom-0 left-0">
          desenvolvido com react, supabase, tailwind

          <div className="flex gap-4 text-gray-400 z-50 justify-start relative lowercase">
            <a className="hover:text-gray-50 duration-100" href="https://github.com/brunofranciscojs">GITHUB</a>
            <a className="hover:text-gray-50 duration-100" href="https://brunofrancisco.com.br">WEBSITE</a>
            <a className="hover:text-gray-50 duration-100" href="https://linkedin.com/in/bruno-francisco-">LINKEDIN</a>
          </div>
        </footer>

        <Nav setCategoria={setCategoria} setUpWindow={setUpWindow} upWindow={upWindow} nova={nova} setNova={setNova}/>
    </BrowserRouter>
  );
}
