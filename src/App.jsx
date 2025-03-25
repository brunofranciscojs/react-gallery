import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';

export default function App() {

  return (
    <div className="App">

      <div className="fixed top-0 left-0 -z-2">
        <canvas id="fluid" className="w-screen h-screen opacity-25" />
      </div>

      <Nav/>
      <div className='presentation duration-200 transition-all relative overflow-hidden my-[70px] max-w-[1100px] mx-auto sm:py-7 sm:px-16 text-left rounded-3xl flex bg-[length:100%,50%] px-8 py-8 z-0'>

        <div className=" relative grid place-items-center mx-auto">
          <span className="text-gray-700 dark:text-gray-200 tracking-[20px]">BRUNO FRANCISCO</span>
          <h1 className="font-100 text-gray-700 dark:text-gray-100 leading-none m-0 w-full text-[clamp(1rem,_0.284rem_+_3.9506vw,_2rem)] font-['Time_New_Roman'] uppercase text-center tracking-[10px] mt-2">
            Ilustras e rabiscos.
          </h1>
        </div>

        <div className="z-0 bg-[length:80%] w-full h-full absolute right-0 top-0 bg-[center_50%] text-[#e5e5e5] dark:text-[#434343] bg-fixed"></div>
      </div>
      <Mansonry />
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
