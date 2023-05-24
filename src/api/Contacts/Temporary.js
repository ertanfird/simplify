import axios from 'axios';
import { configGet } from '../configs';

const PRE_URL = 'Contacts/';

const getTemporary = async (setUsers) => {

  try {
    const response = await axios(configGet(`${PRE_URL}Temporary/Get`));
    setUsers(response.data.contacts);
  } catch (error) {
    console.log(error);
  }
}

export default getTemporary;