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
    <div className='content-page'>
      <div className='title-page'>
        <h1>Listado de Proveedores</h1>
        <button>Nuevo Proveedor</button>
      </div>
      {cargando ? (
        <p>Cargando datos...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Ciudad</th>
              <th>Crédito</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length === 0 ? (
              <tr>
                <td colSpan="4">No hay proveedores registrados aún.</td>
              </tr>
            ) : (
              proveedores.map((prov) => (
                <tr key={prov.id}>
                  <td>{prov.nombre}</td>
                  <td>{prov.categoria || '--'}</td>
                  <td>{prov.ciudad || '--'}</td>
                  <td>{prov.tiene_credito ? 'SÍ' : 'NO'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}