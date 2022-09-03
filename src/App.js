import React, {useContext, useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './router';
import './styles/main.scss';
import { useTheme } from './hooks/useTheme';
import Context from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeClick = (e) => {
    if (theme == 'light') {
      setTheme('dark');
      e.target.classList.remove('theme-light');
      e.target.classList.add('theme-dark');
    } else {
      setTheme('light');
      e.target.classList.add('theme-light');
      e.target.classList.remove('theme-dark');
    }
  }

  const value = {
    isAuth,
    setIsAuth,
    theme,
    handleThemeClick
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
