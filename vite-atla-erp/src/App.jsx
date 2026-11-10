import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Proveedores from './pages/proveedores'
import Clientes from './pages/clientes'
import NavBar from './navbar'

function App() {
  return (
    <>
      <NavBar/>
      <div className='contentContainer'>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path='/Home' element={<Home/>}/>
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
      </div>
    </>
  )
}

export default App