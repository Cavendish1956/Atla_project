import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<div>Dashboard del ERP</div>} />
        {/* Aquí irán creciendo tus módulos: /inventario, /facturacion, etc. */}
      </Routes>
    </Router>
  )
}

export default App