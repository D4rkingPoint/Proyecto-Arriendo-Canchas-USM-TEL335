import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import Logo from '../styles/img/Logo_UTFSM.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/signin', { email, password });
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      if (response.data.isAdmin) {
        history.push('/admin/estadisticas');
      } else {
        history.push('/usuario/Home_Usuario');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Actualiza el mensaje de error
      } else {
        setError("Inicio de sesión fallido. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const containerStyle = {
    border: '1px solid #000',
    padding: '20px',
    height: 'auto',
    backgroundColor: 'whitesmoke',
    marginTop: '20px',  // Ajustar el margen superior para separar del logo
    width: '300px',     // Ajustar el ancho del contenedor
    margin: '20px auto', // Centrar el contenedor horizontalmente
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // Añadir sombra para mejorar la apariencia
  };

  const logoStyle = {
    display: 'block',
    margin: '0 auto',
    maxWidth: '200px',
    height: 'auto',
    marginTop: '20px'
  };

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px'
  };

  return (
    <div>
      <a href="/">
        <img src={Logo} alt="Logo UTFSM" style={logoStyle} />
      </a>
      <div style={containerStyle} className="container">
        <h1 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Ingresa tus credenciales para iniciar sesión</h1>
        {error && <div style={errorStyle}>{error}</div>} {/* Muestra el mensaje de error si existe */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>Correo:</td>
                  <td>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </td>
                </tr>
                <tr>
                  <td>Contraseña:</td>
                  <td>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button type="submit" style={{ width: '100%' }}>Iniciar Sesión</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span onClick={() => history.push('/register')} style={{ color: 'blue', cursor: 'pointer' }}>¿No tienes una cuenta? Haz click acá</span>
          <br />
          <span onClick={() => history.push('/password-recovery')} style={{ color: 'blue', cursor: 'pointer' }}>Recuperar contraseña</span>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Login;