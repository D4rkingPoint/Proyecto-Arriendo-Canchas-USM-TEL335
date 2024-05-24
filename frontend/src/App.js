import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reservations from './pages/usuario/Reservations';
//import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';
import PasswordRecovery from './pages/password-recovery';
import Home_Usuario from './pages/usuario/Home_Usuario'
import Notificacions from './pages/usuario/Notifications'
import Profile from './pages/usuario/Profile'
import Logout from './pages/usuario/Logout'
import Estadisticas_Administrador from './pages/Administrador/Estadisticas_Administrador'
import Gestion_Canchas from './pages/Administrador/Gestion_Canchas'
import Gestion_Usuarios from './pages/Administrador/Gestion_Usuarios'
import Logout_Admin from './pages/Administrador/Logout_Admin'
import Notifications_admin from './pages/Administrador/Notifications_admin'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/usuario/reservations" component={Reservations} />
        <Route path="/password-recovery" component={PasswordRecovery} />
        <Route path="/usuario/home_usuario" component={Home_Usuario} />
        <Route path="/usuario/notifications" component={Notificacions} />
        <Route path="/usuario/logout" component={Logout} />
        <Route path="/usuario/profile" component={Profile} />
        <Route path="/admin/estadisticas" component={Estadisticas_Administrador} />
        <Route path="/admin/gestionCanchas" component={Gestion_Canchas} />
        <Route path="/admin/gestionUsuarios" component={Gestion_Usuarios} />
        <Route path="/admin/logoutAdmin" component={Logout_Admin} />
        <Route path="/admin/notificationAdmin" component={Notifications_admin} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;