import React from 'react';
//import { Link } from 'react-router-dom';
//import Logo from '../../styles/img/Logo_UTFSM.png';
import Navbar from '../../components/Navbar';
import '../../components/Navbar'; // Importa el archivo CSS para los estilos de la barra de navegación
import '../../styles/notifications.css'; // Importa el archivo CSS para los estilos de las notificaciones

function Notifications() {
  // Ejemplo de notificaciones recibidas
  const notifications = [
    { id: 1, message: 'Tu reserva ha sido confirmada.' },
    { id: 2, message: 'Tienes una nueva notificación.' },
    { id: 3, message: 'Tu cuenta ha sido actualizada.' }
  ];

  return (
    <div>
      <Navbar />
      <div className="notifications-container">
        <h2>Notificaciones</h2>
        <ul>
          {notifications.map(notification => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
