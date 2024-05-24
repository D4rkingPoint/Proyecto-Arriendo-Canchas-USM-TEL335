import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reservations from './pages/Reservations';
import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';
import PasswordRecovery from './pages/password-recovery';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reservations" component={Reservations} />
        <Route path="/password-recovery" component={PasswordRecovery} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;