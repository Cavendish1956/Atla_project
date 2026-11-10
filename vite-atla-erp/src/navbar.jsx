import { Link } from "react-router-dom"

export default function NavBar() {
    return <nav className="navbar">
        <Link to="/Home" className="title-logo">
            <img src='../resources/logo_peralta.png' alt="Logo Peralta Ing." style={{height: '30px'}}/>
        </Link>
        <ul>
            <li>
                <Link to="/Proveedores">Proveedores</Link>
            </li>
            <li>
                <Link to="/Clientes">Clientes</Link>
            </li>
        </ul>
    </nav>
}