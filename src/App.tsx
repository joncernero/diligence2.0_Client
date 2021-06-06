import React, { useState, useEffect } from 'react';
import Dashboard from './Components/Contents/Dashboard';
import PropertyIndex from './Components/Contents/Property/PropertyIndex';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container } from './Components/Styles/Containers';
import { GlobalStyle } from './Components/Styles/Global';
import Login from './Components/Authorization/Login';
import Navbar from './Components/Navigation/Navbar';
import Home from './Components/Pages/Home';

type Token = {
  sessionToken: string | null;
};

const App = () => {
  const [sessionToken, setSessionToken] = useState<string | null>('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  const protectedViews = (pageToShow: string) => {
    let component;

    if (pageToShow === 'dashboard') {
      component = <Dashboard token={sessionToken} />;
    }
    // if (pageToShow === 'admin') {
    //   component = <Admin token={sessionToken} />;
    // }
    if (pageToShow === 'property') {
      component = <PropertyIndex token={sessionToken} />;
    }
    // if (pageToShow === 'units') {
    //   component = <UnitIndex token={sessionToken} />;
    // }
    // if (pageToShow === 'features') {
    //   component = <FeatureIndex token={sessionToken} />;
    // }
    // if (pageToShow === ' photos') {
    //   component = <PhotoIndex token={sessionToken} />;
    // }

    return localStorage.getItem('token') ? component : <Redirect to='/' />;
  };

  return (
    <Router>
      <GlobalStyle />
      <Navbar clearToken={clearToken} sessionToken={sessionToken} />
      <Container>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route
            path='/login'
            component={() =>
              sessionToken ? (
                <Redirect to='/dashboard' />
              ) : (
                <Login updateToken={updateToken} />
              )
            }
          />
          <Route path='/dashboard'>{protectedViews('dashboard')}</Route>
          <Route path='/property'>{protectedViews('property')}</Route>
          <Route path='/units/:propertyId'>{protectedViews('units')}</Route>
          <Route path='/features/:unitId'>{protectedViews('features')}</Route>
          <Route path='/photos'>{protectedViews('photos')}</Route>
          <Route path='/admin'>{protectedViews('admin')}</Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
