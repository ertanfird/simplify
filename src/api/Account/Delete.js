import axios from 'axios';
import { configDelete } from '../configs';

const PRE_URL = 'Account/';

const onDelete = async () => {
  try {
    await axios(configDelete(`${PRE_URL}Delete`));
  } catch (error) {
    console.log(error);
  }
}

export default onDelete;