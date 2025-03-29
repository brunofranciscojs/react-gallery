import { useState } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';
import { SplideSlide, Splide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';

export default function App() {
  const [image, setImage] = useState({});

  const getImage = (url) => {
    setImage((prev) => ({
      ...prev,
      [url]:url
    }))
  }

  return (
    <div className="App">

      <Nav/>

      <div className='presentation duration-200 transition-all relative overflow-hidden my-[70px] max-w-[1100px] mx-auto sm:py-7 sm:px-16 text-left rounded-3xl flex bg-[length:100%,50%] px-8 py-8 z-0 bg-white'>
        <div className="relative z-10">
          <span className="text-gray-700 text-3xl font-['Highland_Jakarta'] tracking-[1rem]">BRUNO FRANCISCO</span>
          <h1 className="text-white font-['Highland_Jakarta'] leading-none text-[clamp(1rem,_0.284rem_+_3.9506vw,_5rem)] mt-2 [-webkit-text-stroke:1px_#444] ">
            Ilustras e rabiscos.
          </h1>
        </div>
        <div className='absolute left-0 w-full h-full top-0 bg-[linear-gradient(to_right,#fff_40%,transparent_100%)] z-[1] pointer-events-none'>

        </div>
        {image && 
         <div className='absolute right-0 -top-44 w-[40rem] h-auto z-0'>
           <Splide options={{perPage:1, autoplay:true, arrows:false, type:'fade', rewind:true, width:'100%', pagination:false, height:'100%'}}>
            {Object.entries(image).map((img,index) =>
              <SplideSlide key={index}>
                <img src={img} className='object-contain w-full h-full'/>
              </SplideSlide>
            )}
           </Splide>
         </div>
        }
      </div>

      <Mansonry imagem={getImage} />

      <footer className="text-center text-gray-700 dark:text-gray-400 pt-20 text-sm">
        desenvolvido com react, firebase, tailwind

        <div className="flex gap-4 text-gray-400 z-50 justify-center relative lowercase ">
          <a className="hover:text-gray-50 duration-100" href="https://github.com/brunofranciscojs">GITHUB</a>
          <a className="hover:text-gray-50 duration-100" href="https://brunofrancisco.com.br">WEBSITE</a>
          <a className="hover:text-gray-50 duration-100" href="https://linkedin.com/in/bruno-francisco-">LINKEDIN</a>
        </div>

      </footer>
    </div>
  );
}
