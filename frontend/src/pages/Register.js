import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';  // Asegúrate de que el archivo api.js esté correctamente configurado.
import Logo from '../styles/img/Logo_UTFSM.png';

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      await api.post('/auth/signup', { nombre, apellido, email, password });
      history.push('/login');
    } catch (error) {
      console.error("Registro fallido", error);
    }
  };

  const containerStyle = {
    border: '1px solid #000',
    padding: '20px',
    height: 'auto',
    backgroundColor: 'whitesmoke',
    marginTop: '20px',
    width: '300px',
    margin: '20px auto',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
  };

  const logoStyle = {
    display: 'block',
    margin: '0 auto',
    maxWidth: '200px',
    height: 'auto',
    marginTop: '20px'
  };

  return (
    <div>
      <a href="/">
        <img src={Logo} alt="Logo UTFSM" style={logoStyle} />
      </a>
      <div style={containerStyle} className="container">
        <h1>Crea una cuenta para comenzar</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table>
            <tbody>
              <tr>
                <td>Nombre:</td>
                <td>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </td>
              </tr>
              <tr>
                <td>Apellido:</td>
                <td>
                  <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </td>
              </tr>
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
                  <button type="button" onClick={handleSubmit} style={{ width: '100%' }}>Registrarse</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span onClick={() => history.push('/login')} style={{ color: 'blue', cursor: 'pointer' }}>
          ¿Ya tienes una cuenta? Haz click acá para iniciar sesión
        </span>
      </div>
    </div>
  );
}

export default Register;
