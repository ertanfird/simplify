import {Navigate} from 'react-router-dom';
import Loginpage from '../pages/Loginpage';
import Signpage from '../pages/Signpage';
import Main from '../pages/Main';

export const privateRoutes = [
  {path: '/', element: <Main />, exact: true},
  {path: '*', element: <Navigate to="/" replace />, exact: true}
]

export const publicRoutes = [
  {path: '/', element: <Navigate to="/login" replace />, exact: true},
  {path: '/login', element: <Loginpage />, exact: true},
  {path: '/signup', element: <Signpage />, exact: true},
  {path: '*', element: `Error 404`, exact: true}
]

//   {isAuth
//   ?
//   <Routes >
//       {privateRoutes.map(route =>
//         <Route
//           path={route.path}
//           element={route.element}
//           exact={route.exact}
//         />
//       )}
//   </Routes>
//   :
//   <Routes >
//       {publicRoutes.map(route =>
//         <Route
//           path={route.path}
//           element={route.element}
//           exact={route.exact}
//         />
//       )}
//   </Routes>
// }
