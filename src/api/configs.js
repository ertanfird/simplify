const SERVER = 'localhost';
const BASE_URL = `http://${SERVER}:5000/api/`;

const configGet = (url) => {
  return (
    {
      method: 'get',
      url: `${BASE_URL}${url}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
  );
}

const configPost = (url, data) => {
  return ({
    method: 'post',
    url: `${BASE_URL}${url}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    data: data
  });
}

const configDelete = (url) => {
  return (
    {
      method: 'delete',
      url: `${BASE_URL}${url}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
  );
}

export { configGet, configPost, configDelete };