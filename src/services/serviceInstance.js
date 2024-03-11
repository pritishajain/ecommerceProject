import axios from 'axios';

const API_URL = '/api/v1'; 

const service = axios.create({
  baseURL: API_URL,
  headers : {
    "Content-Type" : 'application/json'
  }
});

export default service;
