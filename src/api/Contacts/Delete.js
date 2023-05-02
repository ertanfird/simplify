import axios from 'axios';
import { configDelete } from './configs';

const PRE_URL = 'Contacts/';

const deleteContacts = async (usernames, setUsers) => {
  const data = JSON.stringify({
    'usernames': usernames
  })

  try {
    const response = await axios(configDelete(`${PRE_URL}Delete`, data));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default deleteContacts;