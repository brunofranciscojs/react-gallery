import './App.css'
import Mansonry from './mansonry'
import Nav from './Nav.jsx'

function App() {
  return (
    <div className="App">
      <Nav></Nav>

      <div className='presentation'>
        <span>BRUNO FRANCISCO</span>
        <h1>ESTUDOS DESENHO E PINTRA DIGITAL</h1>
      </div>

      <Mansonry></Mansonry>
    </div>
  )
}

export default App
