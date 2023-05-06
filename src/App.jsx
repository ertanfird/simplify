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
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') || null);
  const { theme, setTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [statusServer, dispatchStatusServer] = useReducer(dispatchStatusServerFn, initialStatusServer);
  const [needRefreshToken, setNeedRefreshToken] = useState(false);

  const handleThemeClick = () => {
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
    refreshToken, 
    setRefreshToken,
    statusServer,
    dispatchStatusServer,
    needRefreshToken,
    setNeedRefreshToken
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
