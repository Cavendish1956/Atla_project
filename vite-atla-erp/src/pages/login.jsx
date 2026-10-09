import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase' 

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Hook de react-router para redireccionar después del login
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault() // Evita que la página se recargue al enviar el formulario
    setLoading(true)
    setError(null)

    // Llamada a la API de autenticación de Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate('/dashboard') // Si el login es correcto, enviamos al usuario al Dashboard
    }
    
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto'}}>
      <h1>AtlaERP</h1>
      <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '10px auto'}}>
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        
        <input
          type="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        
        <button type="submit" disabled={loading} style={{ margin: '20px 0', padding: '10px', cursor: 'pointer' }}>
          {loading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>

        {/* Mostrar mensaje de error si las credenciales fallan */}
        {error && <p style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>{error}</p>}
      </form>
    </div>
  )
}