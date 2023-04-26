import axios from 'axios';
import { configPost } from './configs';

const PRE_URL = 'Messages/';

const onSend = async (id, receiver, staticKey, message, getToken, ctx) => {
  const data = JSON.stringify({
    'id': id,
    'receiver': receiver,
    'staticKey': staticKey,
    'message': message
  });

  if (message) {
    await axios(configPost(`${PRE_URL}Send`, data))
      .then((response) => {
        return
      })
      .catch((error) => {
        console.log(data);
        
        if (getToken) {
          getToken(ctx, onSend, [id, receiver, staticKey, message, null, ctx])
        }
        if (error.response.data) {
          ctx.dispatchStatusServer({ type: 'ERROR', data: error.response.data })
          setTimeout(() => {
            ctx.dispatchStatusServer({ type: 'DEFAULT' })
          }, "4000");
        }
      })
  } else {
    ctx.dispatchStatusServer({ type: 'ERROR', data: 'Input message!' })
    setTimeout(() => {
      ctx.dispatchStatusServer({ type: 'DEFAULT' })
    }, "2000");
  }
};

export { onSend };