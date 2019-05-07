import { AsyncStorage } from 'react-native';

import Axios from 'axios';

let tokenPB = AsyncStorage.getItem('@ProjectBuilder:token');

// console.log('Token: ' + tokenPB);

const axios = Axios.create({
    baseURL: 'http://179.107.43.8:8080/apiPb/api',
    headers: { Authorization: 'Bearer ' + tokenPB }
});

export default axios;