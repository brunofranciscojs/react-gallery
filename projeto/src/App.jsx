import './App.css'
import Mansonry from './mansonry'
import Nav from './Nav.jsx'

function App() {
  return (
    <div className="App">
      <Nav></Nav>

      <div className='presentation'>

        <div>
          <span>BRUNO FRANCISCO</span>
          <h1>Estudos de ilustras e rabiscos.</h1>
        </div>

        <div></div>
      </div>

      <Mansonry></Mansonry>
    </div>
  )
}

export default App
