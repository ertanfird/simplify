import axios from 'axios';
import { configPost } from './configs';

const PRE_URL = 'Contacts/';

const addContacts = async (usernames,setUsers) => {
  const data = JSON.stringify({
    'usernames': usernames
  })

  try {
    const response = await axios(configPost(`${PRE_URL}Add`, data));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default addContacts;