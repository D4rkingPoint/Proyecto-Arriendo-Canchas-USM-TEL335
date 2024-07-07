import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/Navbar_admin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api';

function Gestion_Usuarios() {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Fetch users with reservation info
    api.get('/users')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Función para manejar la selección de usuario
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedDate(null); // Reiniciar la selección de fecha al cambiar de usuario
    setShowConfirmation(true); // Mostrar el popup de confirmación
  };

  // Función para manejar la selección de fecha
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Función para deshabilitar al usuario seleccionado
  const handleDisableUser = () => {
    api.post(`/users/${selectedUser.id}/disable`, { disableDate: selectedDate })
      .then(response => {
        setShowConfirmation(false); // Ocultar el popup después de confirmar
        // Actualizar la lista de usuarios
        setUsers(users.map(user => user.id === selectedUser.id ? { ...user, disabledUntil: selectedDate, disabled: true } : user));
      })
      .catch(error => console.error('Error disabling user:', error));
  };

  // Función para habilitar al usuario seleccionado
  const handleEnableUser = () => {
    api.post(`/users/${selectedUser.id}/enable`)
      .then(response => {
        setShowConfirmation(false); // Ocultar el popup después de confirmar
        // Actualizar la lista de usuarios
        setUsers(users.map(user => user.id === selectedUser.id ? { ...user, disabledUntil: null, disabled: false } : user));
      })
      .catch(error => console.error('Error enabling user:', error));
  };

  // Función para cancelar la acción de deshabilitar usuario
  const handleCancelDisable = () => {
    setSelectedUser(null); // Limpiar la selección de usuario
    setShowConfirmation(false); // Ocultar el popup de confirmación
  };

  return (
    <div>
      <NavbarAdmin />
      <div style={styles.container}>
        <h1>Gestión de Usuarios</h1>
        <div style={styles.userList}>
          {users.map((user) => (
            <div key={user.id} style={styles.userContainer}>
              <div style={styles.userInfo}>
                <h2>{user.nombre} {user.apellido}</h2>
                <div>
                  Reservas: {user.totalReservas} | Confirmadas: {user.reservasConfirmadas} | Anuladas: {user.reservasAnuladas} | Sin Confirmar: {user.reservasSinConfirmar}
                </div>
              </div>
              <div style={styles.userActions}>
                {user.is_admin ? (
                  <button disabled style={styles.adminButton}>Admin</button>
                ) : user.disabled ? (
                  <button onClick={() => handleUserSelect(user)} style={styles.enableButton}>Habilitar</button>
                ) : (
                  <button onClick={() => handleUserSelect(user)} style={styles.disableButton}>Deshabilitar</button>
                )}
              </div>
            </div>
          ))}
        </div>
        {showConfirmation && (
          <div style={styles.confirmationPopup}>
            <h2>{selectedUser.disabled ? 'Habilitar Usuario' : 'Deshabilitar Usuario'}</h2>
            <p>¿Estás seguro de que deseas {selectedUser.disabled ? 'habilitar' : 'deshabilitar'} al usuario "{selectedUser.nombre} {selectedUser.apellido}"?</p>
            <div style={styles.popupContent}>
              {!selectedUser.disabled && (
                <div>
                  <h3>Seleccionar fecha de inicio de la inhabilitación</h3>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateSelect}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              )}
              <div style={styles.popupButtons}>
                {!selectedUser.disabled ? (
                  <button onClick={handleDisableUser} disabled={!selectedDate} style={styles.confirmButton}>Confirmar</button>
                ) : (
                  <button onClick={handleEnableUser} style={styles.confirmButton}>Confirmar</button>
                )}
                <button onClick={handleCancelDisable} style={styles.cancelButton}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  userList: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
  },
  userInfo: {
    flex: 1,
  },
  userActions: {
    display: 'flex',
    alignItems: 'center',
  },
  adminButton: {
    backgroundColor: '#F7C650',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  disableButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  enableButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  confirmationPopup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    zIndex: '1000',
  },
  popupContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  popupButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  confirmButton: {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Gestion_Usuarios;
