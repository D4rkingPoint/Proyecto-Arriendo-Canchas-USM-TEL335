import React, { useState } from 'react';
import NavbarAdmin from '../../components/Navbar_admin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Gestion_Usuarios() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    // Aquí puedes implementar la lógica para deshabilitar al usuario
    console.log('Usuario deshabilitado:', selectedUser);
    console.log('Fecha seleccionada:', selectedDate);
    setShowConfirmation(false); // Ocultar el popup después de confirmar
  };

  // Función para cancelar la acción de deshabilitar usuario
  const handleCancelDisable = () => {
    setSelectedUser(null); // Limpiar la selección de usuario
    setShowConfirmation(false); // Ocultar el popup de confirmación
  };

  // Ejemplos de usuarios
  const users = [
    { id: 1, username: 'usuario1', carrera: 'Ingeniería Civil', reservas: 5 },
    { id: 2, username: 'usuario2', carrera: 'Ingeniería Informática', reservas: 10 },
    { id: 3, username: 'usuario3', carrera: 'Ingeniería Eléctrica', reservas: 8 },
  ];

  return (
    <div>
      <NavbarAdmin />
      <div style={styles.container}>
        <h1>Gestión de Usuarios</h1>
        <div style={styles.userList}>
          {users.map((user) => (
            <div key={user.id} style={styles.userContainer}>
              <div style={styles.userInfo}>
                <h2>{user.username}</h2>
                <div>
                  Carrera: {user.carrera} | Reservas: {user.reservas}
                </div>
              </div>
              <div style={styles.userActions}>
                <button onClick={() => handleUserSelect(user)} style={styles.disableButton}>Deshabilitar</button>
              </div>
            </div>
          ))}
        </div>
        {showConfirmation && (
          <div style={styles.confirmationPopup}>
            <h2>Deshabilitar Usuario</h2>
            <p>¿Estás seguro de que deseas deshabilitar al usuario "{selectedUser.username}"?</p>
            <div style={styles.popupContent}>
              <div>
                <h3>Seleccionar fecha de inicio de la inhabilitación</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelect}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div style={styles.popupButtons}>
                <button onClick={handleDisableUser} disabled={!selectedDate} style={styles.confirmButton}>Confirmar</button>
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
    maxWidth: '800px', // Establece el ancho máximo del contenedor
    margin: '0 auto', // Centra el contenedor horizontalmente
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
  disableButton: {
    backgroundColor: 'red',
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
    backgroundColor: 'red',
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
