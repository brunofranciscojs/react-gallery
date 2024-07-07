import React from "react";
import './App.css';
import Nav from './Nav.jsx';
import Mansonry from './mansonry';

export default function App() {

  return (
    <div className="App">

      <Nav/>
      <div className='presentation duration-200 transition-all bg-auto' style={{ background:'#efefef'}}>
        <div>
          <span>BRUNO FRANCISCO</span>
          <h1 className="font-bold text-gray-200">Estudos de ilustras e rabiscos.</h1>
        </div>
      </div>
      <Mansonry/>
    </div>
  )
}

