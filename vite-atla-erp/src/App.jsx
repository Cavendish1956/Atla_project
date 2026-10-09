import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Proveedores from './pages/proveedores'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/proveedores" element={<Proveedores />} />
        {/* Aquí irán creciendo tus módulos: /inventario, /facturacion, etc. */}
      </Routes>
    </Router>
  )
}

export default App