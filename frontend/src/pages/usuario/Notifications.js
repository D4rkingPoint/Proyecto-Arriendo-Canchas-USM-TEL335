import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api'; // Asegúrate de tener configurado tu archivo API para manejar solicitudes
import '../../styles/notifications.css'; // Importa el archivo CSS para los estilos de las notificaciones

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await api.get('/user/notifications'); // Ajusta la URL según tu API
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="notifications-container">
        <h2>Notificaciones</h2>
        <ul>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <li key={notification.id}>
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <p><strong>Fecha:</strong> {new Date(notification.date).toLocaleString()}</p>
              </li>
            ))
          ) : (
            <p>No hay notificaciones</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
