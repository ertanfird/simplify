import axios from 'axios';
import { configPost } from '../configs';

const PRE_URL = 'Contacts/';

const addContacts = async (username) => {
  const data = JSON.stringify({
    'username': username.user
  })

  try {
    const response = await axios(configPost(`${PRE_URL}Add`, data));
    //setContacts(prevContacts => [...prevContacts, {}])
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default addContacts;