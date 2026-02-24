"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from '@/contexts/AppContext';
import '@/styles/Nav.css';
import useAuth from "@/hooks/useAuth.jsx";
import Logar from "@/components/login.jsx";
import UploadForm from "@/components/UploadImage.jsx";
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Nav() {
  const { upWindow, setUpWindow, nova, setNova, categories, slugify } = useAppContext();
  const { logado, sair } = useAuth();
  const [logar, setLogar] = useState(false);
  const selectedSegment = useSelectedLayoutSegment();
  const activeCategory = selectedSegment || 'misc';

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <clipPath id="diamante-invertido">
            <rect x="0" y="0" width="100%" height="100%" />
            <polygon points="50,0 100,50 50,100 0,50" fill="black" clip-rule="evenodd" />
          </clipPath>
        </defs>
      </svg>

      {logado && upWindow && <UploadForm setUpWindow={setUpWindow} nova={nova} />}
      {logado && (
        <>
          <span className='log fixed right-12 top-[14px] text-gray-600 hover:text-gray-950 cursor-pointer z-50 hidden sm:block' onClick={sair}>sair</span>
          <button className='log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-30 text-2xl hidden sm:block' onClick={() => { setUpWindow(true); setNova(false) }}> + </button>
        </>
      )}

      {!logado && (
        <div className='flex flex-row add items-center fixed top-0 right-8 z-50'>
          <button className='log text-2xl cursor-pointer text-gray-700 z-50 relative top-2' onClick={() => setLogar(true)}> + </button>
          {logar && (
            <>
              <button className='log text-2xl cursor-pointer text-gray-700 z-50 absolute lpt:top-[.45rem] top-[3.4rem] backdrop-blur px-2' onClick={() => setLogar(false)}>x</button>
              <Logar />
            </>
          )}
        </div>
      )}

      <nav>
        <ul className="items-start md:items-center justify-center z-10 relative w-full mx-auto [&_.active]:text-black shadow-xl shadow-black/5">
          {categories.map((table, index) => {
            const categorySlug = slugify(table);
            const isActive = categorySlug === activeCategory;
            return (
                <Link href={`/${categorySlug}`} passHref legacyBehavior={false} key={index} 
                      className={`${isActive ? 'active' : ''} md:text-lg text-[.9rem] max-w-[130px] font-[400] text-black/40 py-2 sm:py-3 px-2 sm:px-5 hover:text-black hover:[text-shadow:0_0_10px_white] uppercase cursor-pointer`}>
                  {table}
                </Link>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

