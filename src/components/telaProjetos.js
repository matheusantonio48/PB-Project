import React, { Component } from 'react';

import { AsyncStorage } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import axios from '../services/axios';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Content, Accordion, Title, Item, Toast } from "native-base";

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    TextInput
} from 'react-native';

export default class telaProjetos extends Component {

   
    state = {
        projetos: [],
    }

    async componentDidMount() {
        let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');
        axios.get('/v1/projeto/listar', { headers: { Authorization: 'Bearer ' + tokenPB } }).then(response => {
            console.log(response.data)
            // console.log("Token: " + tokenPB);
            this.setState({ projetos: response.data });
        }).catch(error => {
            console.log('Error: ' + error);
            // console.log("Token: " + tokenPB);
        });
    }

    // renderProjetos = () => {
    //     this.state.projetos.map(projeto => (

    //     ))
    // }

    render() {
        return (
            <View>
                <Text>'teste'</Text>
            </View>
        );
    }
}