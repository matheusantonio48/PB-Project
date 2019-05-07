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
    FlatList,
    ImageBackground,
    Text,
    TextInput
} from 'react-native';

export default class telaProjetos extends Component {


    state = {
        projetos: [],
        projetosId: [],
        componentes: []
    }

    async componentDidMount() {
        let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');
        axios.get('/v1/projeto/listar', { headers: { Authorization: 'Bearer ' + tokenPB } }).then(response => {
            // console.log("Token: " + tokenPB);
            this.setState({ projetos: response.data.lista });
            console.log(this.state.projetos[0].id);
            // console.log(this.state.projetos);

            this.state.projetos.forEach(function (projeto, index) {
                console.log(projeto.id);
            });

            axios({
                method: 'get',
                url: '/v1/componente/listar',
                headers: { Authorization: 'Bearer ' + tokenPB },
                data: {
                    "id": this.state.projetos[0].id
                }
            }).then(response => {
                // console.log("Token: " + tokenPB);
                // this.setState({ componentes: response.data.lista });
                // console.log(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log('Error: ' + error);
                // console.log("Token: " + tokenPB);
            });


        }).catch(error => {
            console.log('Error: ' + error);
            // console.log("Token: " + tokenPB);
        });
    }

    // async renderProjetos() {

    //     return this.state.projetos.map((item, key) => {
    //         return (
    //             <View>
    //                 <Text key={key}> {item.nome} </Text>
    //                 <Text key={key}> {item.inicioPrevisto} </Text>
    //                 <Text key={key}> {item.fimPrevisto} </Text>
    //             </View>
    //         )
    //     })
    // }

    render() {

        return (
            <View>
                {this.state.projetos.map((item, key) => (
                    <Text key={key}> Nome: {item.nome}
                        - Início Previsto: {item.inicioPrevisto}
                        - Fim Previsto: {item.fimPrevisto}
                        - Início Real: {item.inicioReal}
                        - Situação: {item.situacao} {"\n"} </Text>
                )
                )}
                {/* {this.renderProjetos()} */}
            </View>
        );
    }
}