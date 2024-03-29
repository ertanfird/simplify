import { parse, stringify } from "qs";

const SERVER = localStorage.getItem('SERVER') || prompt();
localStorage.setItem('SERVER', SERVER);
const BASE_URL = `http://${SERVER}:5000/api/`;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}

const configGet = (url, data) => (
  {
    method: 'get',
    url: `${BASE_URL}${url}`,
    headers: headers,
    params: data
  }
);

const configPost = (url, data) => (
  {
    method: 'post',
    url: `${BASE_URL}${url}`,
    headers: headers,
    data: data
  }
);

const configDelete = (url) => (
  {
    method: 'delete',
    url: `${BASE_URL}${url}`,
    headers: headers
  }
)

export { configGet, configPost, configDelete };