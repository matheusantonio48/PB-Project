import { AsyncStorage } from 'react-native';
import Axios from 'axios'

var queryString = require('queryString')
var urlDev = 'http://179.107.43.8:8080'
const tokenUser = JSON.parse(AsyncStorage.getItem('userAuth'))

export default class LoginService {
    login(user) {
        return Axios.post(urlDev + '/apiPb/api/login', queryString.stringify({
            username: user.username,
            password: user.password,
            grant_type: 'password'
        }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'sinn/sinn',
                    password: 'apisinn',
                    grant_type: 'password'
                }
            })
    }
}