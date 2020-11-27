import axios from 'axios'; 
import { initialState } from '../../../globalStore/store';
import { handleResponse, handleError } from './response'; 

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = '/api'; 
const TOKEN = initialState.token;

/** @param {string} resource */ 
const getAll = (resource, page) => { 
  return axios
    .get(`${BASE_URL}/${resource}`,
    {
      headers: {
        Authorization: 'Bearer '+ TOKEN
      },
      params: {
        page: page
      }
    })
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {string} id */ 
const getSingle = (resource, id) => { 
  return axios 
    .get(`${BASE_URL}/${resource}/${id}`,
    {
      headers: {
        Authorization: 'Bearer '+ TOKEN
      }
    })
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const post = (resource, model) => { 
  return axios 
    .post(`${BASE_URL}/${resource}`, model,
    {
      headers: {
        Authorization: 'Bearer '+ TOKEN
      }
    })
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const put = (resource, model) => { 
  return axios 
    .put(`${BASE_URL}/${resource}`, model,
    {
      headers: {
        Authorization: 'Bearer '+ TOKEN
      }
    })
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const patch = (resource, model) => { 
  return axios 
    .patch(`${BASE_URL}/${resource}`, model,
    {
      headers: {
        Authorization: 'Bearer '+ TOKEN
      }
    })
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {string} id */ 
const remove = (resource, id) => { 
  return axios 
    .delete(`${BASE_URL}/${resource}`,
    {
      headers: {
        Authorization: 'Bearer '+ TOKEN
      },
      data: {
        id: id
      }
    })
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const apiProvider = { 
  getAll, 
  getSingle, 
  post, 
  put, 
  patch, 
  remove, 
};