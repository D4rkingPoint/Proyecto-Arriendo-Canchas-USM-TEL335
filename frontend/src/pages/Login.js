import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import Logo from '../styles/img/Logo_UTFSM.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      history.push('/');
    } catch (error) {
      console.error("Inicio de sesión fallido", error);
    }
  };

  const containerStyle = {
    border: '1px solid #000',
    padding: '20px',
    height: 'auto',
    backgroundColor: 'whitesmoke',
    marginTop: '0px'
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
        <h1>Ingresa tus credenciales para iniciar sesión</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                  <button type="submit" onClick={handleSubmit} style={{ width: '100%' }}>Iniciar sesión</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span onClick={() => history.push('/register')} style={{ color: 'blue', cursor: 'pointer' }}>¿No tienes una cuenta? Haz click acá</span>
        <br />
        <span onClick={() => history.push('/password-recovery')} style={{ color: 'blue', cursor: 'pointer' }}>Recuperar contraseña</span>
        <br />
        <button type="button" onClick={() => history.push('/usuario/home_usuario')} style={{ width: '100%', marginTop: '20px', padding: '10px 20px' }}>Supongamos que te logeaste...supongamos</button>
      </div>
    </div>
  );
}

export default Login;
