import axios from 'axios';

const customFetch = axios.create({
  baseURL: `/thread`,
});


export default customFetch;