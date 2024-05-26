import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../styles/img/Logo_UTFSM.png';
import '../styles/navbar.css'; // Importa el archivo CSS para los estilos de la barra de navegación

function Navbar_admin() {
  return (
    <div className="navbar">
      <Link to="/admin/estadisticas">
        <img src={Logo} alt="Logo UTFSM" />
      </Link>
      <nav>
        <ul>
          <li><Link to="/admin/estadisticas">Estadísticas</Link></li>
          <li><Link to="/admin/gestionUsuarios">Gestión de Usuarios</Link></li>
          <li><Link to="/admin/gestionCanchas"><i className="fa fa-bell"></i>Gestión de Canchas</Link></li>
          <li><Link to="/admin/notificationAdmin">Notificaciones</Link></li>
          <li><Link to="/logout">Cerrar Sesión</Link></li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar_admin;

