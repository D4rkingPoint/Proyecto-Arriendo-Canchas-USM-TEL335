import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reservations from './pages/Reservations';
import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reservations" component={Reservations} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;