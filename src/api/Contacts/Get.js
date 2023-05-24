import axios from 'axios';
import { configGet } from '../configs';

const PRE_URL = 'Contacts/';

const getContacts = async (setUsers) => {

  try {
    const response = await axios(configGet(`${PRE_URL}Get`));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default getContacts;