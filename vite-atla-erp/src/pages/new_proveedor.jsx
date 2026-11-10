import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function CrearProveedor() {
  const navigate = useNavigate()
  
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [tipoFacturacion, setTipoFacturacion] = useState('Electrónica')
  const [tieneCredito, setTieneCredito] = useState(false)
  
  // Estados para los archivos
  const [imagen, setImagen] = useState(null)
  const [rutFile, setRutFile] = useState(null)
  
  const [loading, setLoading] = useState(false)

  // Función para subir archivos al Storage de Supabase
  const subirArchivo = async (file, prefijo) => {
    if (!file) return null
    // Creamos un nombre único para que no se sobrescriban archivos con el mismo nombre
    const fileExt = file.name.split('.').pop()
    const fileName = `${prefijo}-${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('documentos_proveedores')
      .upload(fileName, file)

    if (error) {
      console.error('Error subiendo archivo:', error)
      return null
    }

    // Obtenemos la URL pública para poder verla después
    const { data: publicUrlData } = supabase.storage
      .from('documentos_proveedores')
      .getPublicUrl(fileName)
      
    return publicUrlData.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // 1. Subir los archivos primero (si existen)
    const imagenUrl = await subirArchivo(imagen, 'img')
    const rutUrl = await subirArchivo(rutFile, 'rut')

    // 2. Guardar los datos en la tabla de proveedores
    const { error } = await supabase
      .from('proveedores')
      .insert([
        {
          nombre: nombre,
          categoria: categoria,
          ciudad: ciudad,
          tipo_facturacion: tipoFacturacion,
          tiene_credito: tieneCredito,
          imagen_url: imagenUrl,
          documento_rut_url: rutUrl
        }
      ])

    setLoading(false)

    if (error) {
      alert('Error guardando proveedor: ' + error.message)
    } else {
      // 3. Si todo va bien, volvemos a la lista de proveedores
      navigate('/proveedores')
    }
  }

  // Estilos reutilizables para que se vea como en tu imagen
  const labelStyle = { display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px', marginTop: '15px' }
  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }
  const buttonGroupStyle = { display: 'flex', gap: '10px' }
  const toggleButtonStyle = (isActive) => ({
    flex: 1, padding: '10px', cursor: 'pointer', border: '1px solid #ccc', 
    backgroundColor: isActive ? '#f8f9fa' : '#fff',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#333' : '#777',
    borderRadius: '4px', textAlign: 'center'
  })

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h2 style={{ color: '#333' }}>Nuevo Proveedor</h2>
      
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Nombre *</label>
        <input style={inputStyle} type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label style={labelStyle}>Categoría</label>
        <select style={inputStyle} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Selecciona una categoría...</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Servicios">Servicios</option>
          <option value="Logística">Logística</option>
        </select>

        <label style={labelStyle}>Ciudad</label>
        <select style={inputStyle} value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
          <option value="">Selecciona una ciudad...</option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Valencia">Valencia</option>
        </select>

        <label style={labelStyle}>Facturación</label>
        <div style={buttonGroupStyle}>
          <div style={toggleButtonStyle(tipoFacturacion === 'Electrónica')} onClick={() => setTipoFacturacion('Electrónica')}>
            Electrónica
          </div>
          <div style={toggleButtonStyle(tipoFacturacion === 'Rut')} onClick={() => setTipoFacturacion('Rut')}>
            Rut
          </div>
        </div>

        <label style={labelStyle}>Crédito</label>
        <div style={buttonGroupStyle}>
          <div style={toggleButtonStyle(!tieneCredito)} onClick={() => setTieneCredito(false)}>
            NO
          </div>
          <div style={toggleButtonStyle(tieneCredito)} onClick={() => setTieneCredito(true)}>
            {tieneCredito ? '✅ SI' : 'SI'}
          </div>
        </div>

        <label style={labelStyle}>Imagen (Logo o foto) 📷</label>
        <input style={inputStyle} type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />

        <label style={labelStyle}>Documento Rut (PDF o Imagen) 📄</label>
        <input style={inputStyle} type="file" onChange={(e) => setRutFile(e.target.files[0])} />

        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => navigate('/proveedores')} style={{ padding: '12px', flex: 1, cursor: 'pointer', backgroundColor: '#eee', border: 'none', borderRadius: '4px' }}>
            Cancelar
          </button>
          <button type="submit" disabled={loading} style={{ padding: '12px', flex: 2, cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            {loading ? 'Guardando y subiendo archivos...' : 'Guardar Proveedor'}
          </button>
        </div>
      </form>
    </div>
  )
}