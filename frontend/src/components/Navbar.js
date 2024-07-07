import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../styles/img/Logo_UTFSM.png';
import '../styles/navbar.css'; // Importa el archivo CSS para los estilos de la barra de navegación

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/usuario/home_usuario">
        <img src={Logo} alt="Logo UTFSM" />
      </Link>
      <nav>
        <ul>
          <li><Link to="/usuario/home_usuario">Inicio</Link></li>
          <li><Link to="/usuario/notifications"><i className="fa fa-bell"></i> Notificaciones</Link></li>
          <li><Link to="/usuario/profile">Perfil</Link></li>
          <li><Link to="/logout">Cerrar Sesión</Link></li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;