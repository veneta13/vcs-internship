/* eslint-disable semi, indent */

import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Token ' + localStorage.getItem('token')
    }
});
