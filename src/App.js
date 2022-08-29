import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {privateRoutes, publicRoutes} from './router';
import './styles/main.scss';

function App() {
  const isAuth = false;
  return (
    <div className="App">
    {isAuth
    ?
    <Routes >
        {privateRoutes.map(route =>
          <Route
            path={route.path}
            element={route.element}
            exact={route.exact}
          />
        )}
    </Routes>
    :
    <Routes >
        {publicRoutes.map(route =>
          <Route
            path={route.path}
            element={route.element}
            exact={route.exact}
          />
        )}
    </Routes>
  }
    </div>
  );
}

export default App;
