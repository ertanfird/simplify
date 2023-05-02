import axios from 'axios';
import { configGet } from '../configs';

const PRE_URL = 'Users/';

const getUsers = async (username, setUsers) => {
  const data = {
    "username": username
  };

  try {
    const response = await axios(configGet(`${PRE_URL}Get`, data));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default getUsers;