import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://179.107.43.8:8080/apiPb/api',
});

export default axios;