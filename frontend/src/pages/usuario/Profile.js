import React from 'react';
import Navbar from '../../components/Navbar';
import Reservations from './Reservations';

function Profile() {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Reservations />
        </div>
        <div style={{ flex: 1 }}>
          {/* Aquí irá el espacio para solicitar la información del usuario de la base de datos */}
        </div>
      </div>
    </div>
  );
}

export default Profile;