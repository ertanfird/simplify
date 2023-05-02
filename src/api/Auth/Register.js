import axios from 'axios';
import { configPost } from '../configs';

const PRE_URL = 'Auth/';

const onRegister = async (user, ctx, onLogin) => {
  ctx.dispatchStatusServer({ type: 'LOADING' });
  const data = JSON.stringify({
    "username": user.userName,
    "password": user.password,
  });

  try {
    await axios(configPost(`${PRE_URL}Register`, data));
    ctx.dispatchStatusServer({ type: 'SUCCESS' });
    setTimeout(() => {
      onLogin(user, ctx)
    }, "1000");
  } catch (error) {
    ctx.dispatchStatusServer({
      type: 'ERROR',
      data: error.code === 'ERR_NETWORK' ? error.message : error.response.data
    });
  } finally {
    setTimeout(() => {
      ctx.dispatchStatusServer({ type: 'DEFAULT' })
    }, "2000");
  }
};

export default onRegister;