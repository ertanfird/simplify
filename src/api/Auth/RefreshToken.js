import axios from 'axios';
import { configPost } from '../configs';

const PRE_URL = 'Auth/';

const onRefreshToken = async (ctx, fn, fnData) => {
  ctx.dispatchStatusServer({ type: 'LOADING' });
  const data = JSON.stringify({
    "refreshToken": ctx.refreshToken,
  });

  try {
    const response = await axios(configPost(`${PRE_URL}RefreshToken`, data));
    ctx.setCurrentUser(response.data.user.username);
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`
    ctx.setAuthToken(response.data.accessToken)
    fn(...fnData);
    ctx.setNeedRefreshToken();
  } catch (error) {
    console.log(error);
    ctx.dispatchStatusServer({ type: 'ERROR', data: error.response.data.errors })
  } finally {
    ctx.dispatchStatusServer({ type: 'DEFAULT' })
  }
};

export default onRefreshToken;