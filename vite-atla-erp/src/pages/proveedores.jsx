import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase'

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([])
  const [cargando, setCargando] = useState(true)

  // Esta función pide los datos a Supabase cuando la pantalla carga
  useEffect(() => {
    async function obtenerProveedores() {
      const { data, error } = await supabase
        .from('proveedores')
        .select('*')
      
      if (error) {
        console.error("Error cargando proveedores:", error)
      } else {
        setProveedores(data)
      }
      setCargando(false)
    }

    obtenerProveedores()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Módulo de Proveedores</h1>
      <button style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
        + Nuevo Proveedor
      </button>

      {cargando ? (
        <p>Cargando datos...</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'lightblue', borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '10px' }}>Nombre</th>
              <th style={{ padding: '10px' }}>Categoría</th>
              <th style={{ padding: '10px' }}>Ciudad</th>
              <th style={{ padding: '10px' }}>Crédito</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '10px', textAlign: 'center' }}>No hay proveedores registrados aún.</td>
              </tr>
            ) : (
              proveedores.map((prov) => (
                <tr key={prov.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{prov.nombre}</td>
                  <td style={{ padding: '10px' }}>{prov.categoria || '-'}</td>
                  <td style={{ padding: '10px' }}>{prov.ciudad || '-'}</td>
                  <td style={{ padding: '10px' }}>{prov.tiene_credito ? '✅ SÍ' : '❌ NO'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}