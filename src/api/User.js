import axios from 'axios';
import { configDelete } from './configs';

const PRE_URL = 'User/';

const onDelete = async () => {
  await axios(configDelete(`${PRE_URL}Delete`))
    .then((response) => {
      console.log(response);
      
    })
    .catch((error) => {
      console.log(error);
    })
}

export { onDelete }