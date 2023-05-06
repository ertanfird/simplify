import axios from 'axios';
import { configPost } from '../configs';

const PRE_URL = 'Users/';

const getUsers = async (username, setUsers, ctx) => {
  const data = {username: username};  

  try {
    const response = await axios(configPost(`${PRE_URL}Get/`, data));
    setUsers([response.data])
  } catch (error) {
    setUsers([])
    if (error.code === 'ERR_NETWORK') {
      ctx.setNeedRefreshToken({ status: true, fn: getUsers, fnData: [username, setUsers, ctx] })
    }
    if (error.response.data === "User not found!") {
      ctx.dispatchStatusServer({
        type: 'ERROR',
        data: error.response.data
      });
    }
  } finally {
  setTimeout(() => {
    ctx.dispatchStatusServer({ type: 'DEFAULT' });
  }, "2000");
}
  
}

export default getUsers;