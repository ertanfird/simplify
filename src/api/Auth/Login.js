import axios from 'axios';
import { configPost } from '../configs';

const PRE_URL = 'Auth/';

const onLogin = async (user, ctx) => {
  ctx.dispatchStatusServer({ type: 'LOADING' });
  const data = JSON.stringify({
    "username": user.userName,
    "password": user.password
  });

  try {
    const response = await axios(configPost(`${PRE_URL}Login`, data));
    ctx.dispatchStatusServer({ type: 'SUCCESS' })
    setTimeout(() => {
      ctx.setCurrentUser(response.data.user.username);
      
      ctx.setIsAuth(true);
      
      ctx.setRefreshToken(response.data.refreshToken)
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
      ctx.setAuthToken(response.data.accessToken);
      
    }, "800");
  } catch (error) {
    ctx.dispatchStatusServer({
      type: 'ERROR',
      data: error.code === 'ERR_NETWORK' ? error.message : error.response.data
    });
  } finally {
    setTimeout(() => {
      ctx.dispatchStatusServer({ type: 'DEFAULT' });
    }, "2000");
  }
};

export default onLogin;