import React, { useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './router/index';
import './styles/main.scss';
import { useTheme } from './hooks/useTheme';
import Context from './context';

const dispatchStatusServerFn = (prevStatus, action) => {
  return (
    {
      type: action.type ? action.type : 'DEFAULT',
      data: action.data ? action.data : null
    }
  )
}
const initialStatusServer = {
  type: 'DEFAULT',
  data: null
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const { theme, setTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState({});
  const [authToken, setAuthToken] = useState('');
  const [statusServer, dispatchStatusServer] = useReducer(dispatchStatusServerFn, initialStatusServer);

  const handleThemeClick = (e) => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const value = {
    isAuth,
    setIsAuth,
    theme,
    handleThemeClick,
    currentUser,
    setCurrentUser,
    authToken,
    setAuthToken,
    statusServer,
    dispatchStatusServer
  }

  return (
    <Context.Provider value={value}>
      <div className="App">
        {isAuth
          ?
          <Routes >
            {privateRoutes.map(route =>
              <Route
                path={route.path}
                element={route.element}
                exact={route.exact}
                key={route.path}
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
                key={route.path}
              />
            )}
          </Routes>
        }
      </div>
    </Context.Provider >
  );
}

export default App;
