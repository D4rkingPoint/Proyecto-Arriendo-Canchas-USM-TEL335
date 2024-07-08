import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await api.get('/notificaciones');
        setNotifications(response.data.notificaciones);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    }

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notificaciones/${id}/leida`);
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, visto: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.notificationsContainer}>
        <h2 style={styles.heading}>Notificaciones</h2>
        <ul style={styles.ul}>
          {notifications.length > 0 ? (
            notifications
              .filter(notification => !notification.visto) // Filtrar las notificaciones no leídas
              .sort((a, b) => new Date(b.fecha_envio) - new Date(a.fecha_envio)) // Ordenar por fecha más reciente primero
              .map(notification => (
                <li key={notification.id} style={styles.li}>
                  <h3>{notification.tipo}</h3>
                  <p>{notification.mensaje}</p>
                  <p><strong>Fecha:</strong> {notification.fecha_envio}</p>
                  {!notification.visto && (
                    <button onClick={() => markAsRead(notification.id)} style={styles.button}>
                      Marcar como leído
                    </button>
                  )}
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

const styles = {
  notificationsContainer: {
    overflowY: 'auto',
    height: 'calc(100vh - 160px)', // Ajusta la altura para que ocupe toda la pantalla menos la altura de la barra de navegación
    marginTop: '80px', // Espacio superior para compensar la barra de navegación fija
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative', // Establece el contexto de posicionamiento
    zIndex: 1, // Asegura que el contenedor de las notificaciones esté por encima de la barra de navegación
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default Notifications;
