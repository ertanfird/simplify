import {Navigate} from 'react-router-dom';

import Loginpage from '../pages/Loginpage';
import Signpage from '../pages/Signpage';
import Chat from '../pages/Chat';

const privateRoutes = [
  {path: '/', element: <Navigate to="/chat" replace />, exact: true},
  {path: '/simplify', element: <Navigate to="/chat" replace />, exact: true},
  {path: '/login', element: <Navigate to="/chat" replace />, exact: true},
  {path: '/signup', element: <Navigate to="/chat" replace />, exact: true},
  {path: '/chat', element: <Chat />, exact: true},
  {path: '*', element: "Error 404, not found", exact: true}
]

const publicRoutes = [
  {path: '/', element: <Navigate to="/login" replace />, exact: true},
  {path: '/simplify', element: <Navigate to="/login" replace />, exact: true},
  {path: '/login', element: <Loginpage />, exact: true},
  {path: '/signup', element: <Signpage />, exact: true},
  {path: '*', element: <Navigate to="/login" replace />, exact: true}
]

export { privateRoutes, publicRoutes };
