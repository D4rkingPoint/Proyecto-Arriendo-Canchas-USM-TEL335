import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  useEffect(() => {
    // Eliminar el token de autenticación u otros datos del usuario
    localStorage.removeItem('token');
    // Redirigir a la página principal
    history.push('/');
  }, [history]);

  return null;
}

export default Logout;
