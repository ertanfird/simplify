import {Navigate} from 'react-router-dom';
import Loginpage from '../pages/Loginpage';
import Signpage from '../pages/Signpage';

export const privateRoutes = [
  {path: '/', element: 'Message', exact: true},
  {path: '*', element: `Error 404`, exact: true}
]

export const publicRoutes = [
  {path: '/', element: <Navigate to="/login" replace />, exact: true},
  {path: '/login', element: <Loginpage />, exact: true},
  {path: '/signup', element: <Signpage />, exact: true},
  {path: '*', element: `Error 404`, exact: true}
]
