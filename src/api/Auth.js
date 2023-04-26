import axios from 'axios';
import { configPost } from './configs';

const PRE_URL = 'Auth/';

const onSignup = async (user, ctx, onLogin) => {
  const data = JSON.stringify({
    "username": user.userName,
    "password": user.password,
  });
  ctx.dispatchStatusServer({ type: 'LOADING' })

  await axios(configPost(`${PRE_URL}Register`, data))
    .then((response) => {
      ctx.dispatchStatusServer({ type: 'SUCCESS' })
      setTimeout(() => {
        onLogin(user, ctx)
      }, "1000");
    })
    .catch((error) => {
      ctx.dispatchStatusServer({ type: 'ERROR', data: error.response.data.errors })
      setTimeout(() => {
        ctx.dispatchStatusServer({ type: 'DEFAULT' })
      }, "3000");
    })
};


const onLogin = async (user, ctx) => {
  ctx.dispatchStatusServer({ type: 'LOADING' });
  const data = JSON.stringify({
    "username": user.userName,
    "password": user.password
  });

  await axios(configPost(`${PRE_URL}Login`, data))
    .then((response) => {
      setTimeout(() => {
        ctx.dispatchStatusServer('DEFAULT')
        ctx.setCurrentUser(response.data);
        ctx.setIsAuth(true);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`
        ctx.setAuthToken(response.data.accessToken)
      }, "800");
    })
    .catch((error) => {
      if (error.message === 'Network Error') {
        ctx.dispatchStatusServer({ type: 'ERROR', data: error.message })
        // setTimeout(() => {
        //   ctx.dispatchStatusServer({ type: 'DEFAULT' })
        // }, "3000");
      }else {
        ctx.dispatchStatusServer({ type: 'ERROR', data: error.response.data ? error.response.data : error.message })
        setTimeout(() => {
          ctx.dispatchStatusServer({ type: 'DEFAULT' })
        }, "3000");
      }
      console.log(error);
      
    })
};

const getToken = async (ctx, fn, fnData) => {
  ctx.dispatchStatusServer({ type: 'LOADING' });
  const data = JSON.stringify({
    "refreshToken": ctx.currentUser.refreshToken,
  });

  await axios(configPost(`${PRE_URL}RefreshToken`, data))
    .then((response) => {
        ctx.dispatchStatusServer('DEFAULT')
        ctx.setCurrentUser(response.data);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`
        ctx.setAuthToken(response.data.accessToken)
        fn(...fnData);
    })
    .catch((error) => {
      console.log(error);
      ctx.dispatchStatusServer({ type: 'ERROR', data: error.response.data.errors })
      setTimeout(() => {
        ctx.dispatchStatusServer({ type: 'DEFAULT' })
      }, "3000");
    })
}

export { onSignup, onLogin, getToken };