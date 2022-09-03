import React, {useContext} from 'react';
import Context from '../context';

export default function Main(props) {
  const value = useContext(Context);
  function logout(e) {
    e.preventDefault();
    value.setIsAuth(false);
  }
  return(
    <div>
    <div>Messages</div>
    <form onSubmit={logout}>
      <input type="submit" value="Logout" className="button"/>
    </form>
    </div>
  );
}
