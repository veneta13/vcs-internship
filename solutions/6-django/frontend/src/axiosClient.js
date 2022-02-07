import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:8000",
        Authorization: 'Token ' + sessionStorage.getItem('token')
    }
});
