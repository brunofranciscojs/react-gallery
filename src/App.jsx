import React from "react";
import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';

export default function App() {


  return (
    <div className="App">
      <Nav/>
      <div className='presentation duration-200 transition-all relative overflow-hidden z-0 my-[70px] max-w-[1100px] mx-auto sm:py-7 sm:px-16 text-left rounded-3xl flex bg-[length:100%,50%] px-8 py-8 bg-red-400 z-50'>

        <div className="z-10 relative grid place-items-center mx-auto">
          <span className="text-gray-700 dark:text-gray-200 tracking-[20px]">BRUNO FRANCISCO</span>
          <h1 className="font-100 text-gray-700 dark:text-gray-100 leading-none m-0 w-full text-[clamp(1rem,_0.284rem_+_3.9506vw,_2rem)] font-['Time_New_Roman'] uppercase text-center tracking-[10px] mt-2">
            Ilustras e rabiscos.
          </h1>
        </div>

        <div className="z-0 bg-[length:80%] w-full h-full absolute right-0 top-0 bg-[center_50%] text-[#e5e5e5] dark:text-[#434343] bg-fixed"></div>
      </div>
      <Mansonry />
      <footer className="text-center text-gray-700 dark:text-gray-400 pt-20">
        Desenvolvido com React.JS, Firebase, TailwindCSS - Deployed no Vercel
      </footer>
    </div>
  );
}
