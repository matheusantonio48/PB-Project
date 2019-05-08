import React, { Component } from 'react';

import { AsyncStorage } from 'react-native';
import { Content, Thumbnail, Accordion, Title, Item, Toast } from "native-base";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { StackActions, NavigationActions } from 'react-navigation';

import axios from '../services/axios';

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


    constructor(props) {
        super(props);

        this.state = {
            projetos: [],
            componentes: []
        }
    }


    async componentDidMount() {
        let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');
        axios.get('/v1/projeto/listar', { headers: { Authorization: 'Bearer ' + tokenPB } })
            .then(response => {
                this.setState({ projetos: response.data.lista });

                this.state.projetos.forEach(function (projeto, index) {
                    console.log(projeto.id);
                    axios.post('/v1/componente/listar', { "id": projeto.id }, { headers: { Authorization: 'Bearer ' + tokenPB } })
                        .then(response => {
                            this.setState({ componentes: response.data.lista });
                            console.log(response.data.lista)
                        }).catch(error => {
                            console.log('Error: ' + error);
                        });
                });
            }).catch(error => {
                console.log('Error: ' + error);
            });
    }

    alteraLogo() {
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
            <View style={estilo.body}>
                <Content padder>
                    {this.state.projetos.map((item, key) => (
                        <View key={key}
                            style={{ borderRadius: 30, backgroundColor: 'white', margin: 5 }}>
                            <Collapse onPress={this.alteraLogo} >
                                <CollapseHeader >
                                    <View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            paddingLeft: 20,
                                            paddingTop: 8
                                        }}>
                                            <Text style={{
                                                color: 'black',
                                                fontWeight: 'normal',
                                                fontSize: 13
                                            }}>Projeto: </Text>
                                            <Text style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: 14
                                            }}>{item.nome}{"\n"}
                                            </Text>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            paddingLeft: 20,
                                            paddingTop: 8

                                        }}>
                                            <View style={{ flex: 1, justifyContent: 'flex-start', marginStart: 0 }}>
                                                <Text style={{
                                                    color: 'black',
                                                    fontSize: 12
                                                }}>Fim Previsto: {item.fimPrevisto}
                                                </Text>
                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                                <Text style={{
                                                    color: 'black',
                                                    fontSize: 12
                                                }}>Situação: {item.situacao}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            paddingEnd: 20
                                        }}><Thumbnail style={{
                                            width: wp('4%'),
                                            height: hp('4%')
                                        }} source={{ uri: 'https://cdn0.iconfinder.com/data/icons/mobile-set/154/plus-512.png' }} />
                                        </View>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    paddingLeft: 22
                                }}>
                                    <View>
                                        <View>

                                            <Text style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: 13
                                            }}>{item.nome} </Text>
                                        </View>

                                        <View style={{ paddingTop: 5 }}>
                                            <Text style={{
                                                color: 'black',
                                                fontSize: 13,
                                                fontWeight: 'bold'
                                            }}>Início Previsto:
                                                        <Text style={{
                                                    color: 'black',
                                                    fontSize: 12,
                                                    fontWeight: 'normal'
                                                }}> {item.inicioPrevisto} </Text></Text>
                                        </View>

                                        <View style={{ paddingTop: 5 }}>
                                            <Text style={{
                                                color: 'black',
                                                fontSize: 13,
                                                fontWeight: 'normal'
                                            }}>Fim Previsto:
                                                        <Text style={{
                                                    color: 'black',
                                                    fontSize: 12,
                                                    fontWeight: 'bold'
                                                }}> {item.fimPrevisto} </Text></Text>
                                        </View>

                                        <View style={{
                                            paddingTop: 10,
                                            paddingBottom: 20,
                                            flex: 1,
                                            flexDirection: 'row'

                                        }}>
                                            <View style={{ flex: 1, justifyContent: 'flex-start', marginStart: 0 }}>
                                                <Text style={{
                                                    color: 'black',
                                                    fontSize: 12
                                                }}>Início Real: {item.inicioReal}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                                <Text style={{
                                                    color: 'black',
                                                    fontSize: 12
                                                }}>Situação: {item.situacao}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </CollapseBody>
                            </Collapse>
                        </View>
                    ))}
                </Content>
            </View>
        );
    }
}

const estilo = StyleSheet.create({
    header: {
        alignItems: 'center',
        width: wp('100%'),
        height: hp('13%'),
        marginTop: '0%',
        backgroundColor: '#23282c',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        width: '280%',
        height: '280%',
        resizeMode: 'contain'
    },
    principal: {
        flex: 4,
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    textWelcome: {
        textAlign: 'center',
        marginTop: '3%',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    },
    body: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        width: wp('90%'),
        height: hp('10%'),
        resizeMode: 'contain'
    },
    logoStyle: {
        width: wp('45%'),
        height: hp('50%'),
        resizeMode: 'contain'
    },
    logoFooter: {
        width: wp('35%'),
        height: hp('6%'),
        resizeMode: 'contain'
    },
    footer: {
        alignItems: 'center',
        width: wp('100%'),
        height: hp('7%'),
        backgroundColor: '#32373c',
        justifyContent: 'flex-end',
    },
    TextRowBack: {
        color: '#ffb500',
        fontSize: 15,
        flexWrap: 'wrap'
    },
    backrowIcon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: 14,
        paddingLeft: 10,
        paddingRight: 10
    },
    backrowText: {
        flex: 1,
        paddingTop: 8
    },
    subHeader: {
        alignItems: 'flex-start',
        width: wp('100%'),
        height: hp('23%'),
        backgroundColor: '#383c41',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    dadosAcesso: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    iconAcesso: {
        marginLeft: '5%',
        width: wp('8%'),
        height: hp('10%'),
        resizeMode: 'contain'
    },
    TextDados: {
        paddingLeft: wp('10%'),
        fontSize: 19,
        textAlign: 'center',
        color: 'white'
    }
});