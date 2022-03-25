/* eslint-disable semi, indent */

import axios from 'axios';

export const AxiosInstance = axios.create({
    baseURL: '',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Token ' + localStorage.getItem('token')
    }
});
