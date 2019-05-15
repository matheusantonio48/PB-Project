import React, { Component } from 'react';

import { AsyncStorage } from 'react-native';
import { Content, Thumbnail, Accordion, Title, Item, Toast } from "native-base";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { StackActions, NavigationActions } from 'react-navigation';

import axios from '../services/axios';

import Loading from './loading';
// import HeaderPB from './header';

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

export default class telaProjetos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projetos: [],
            componentes: [],
            isLoading: false
        }
    }


    async componentDidMount() {
        updateState = (response) => {
            this.setState({ projetos: response });
        }

        updateLoad = () => {
            setTimeout(() => { this.setState({ isLoading: !this.state.isLoading }) }, 2000)
        }

        let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');
        let projetoComp = [];
        axios.get('/v1/projeto/listar', { headers: { Authorization: 'Bearer ' + tokenPB } })
            .then(response => {
                response.data.lista.forEach(function (projeto) {
                    axios.post('/v1/componente/listar', { "id": projeto.id }, { headers: { Authorization: 'Bearer ' + tokenPB } })
                        .then(responseComp => {
                            projeto.componentes = responseComp.data.lista;
                            projetoComp.push(projeto);
                            updateState(projetoComp);
                        }).catch(error => {
                            console.log('Error: ' + error);
                        });
                });
            }).catch(error => {
                console.log('Error: ' + error);
            }).finally(function () {
                updateLoad();
                console.log('Entrou');
            });
        console.log(this.state.isLoading);
    }


    alteraLogo() {
    }

    renderCorSituacao = (situacao) => {
        if (situacao === 3) {
            return (
                <View style={{ width: 10, height: 10, marginTop: 5, backgroundColor: '#FFFF00' }}></View>
            );
        } else if (situacao === 4) {
            return (
                <View style={{ width: 10, height: 10, marginTop: 5, backgroundColor: '#0000FF' }}></View>
            );
        } else if (situacao === 7) {
            return (
                <View style={{ width: 10, height: 10, marginTop: 5, backgroundColor: '#FF0000' }}></View>
            );
        } else if (situacao === 8) {
            return (
                <View style={{ width: 10, height: 10, marginTop: 5, backgroundColor: '#36d925' }}></View>
            );
        } else if (situacao === 9) {
            return (
                <View style={{ width: 10, height: 10, marginTop: 5, backgroundColor: '#9A62DF' }}></View>
            );
        } else {
            return (
                <View style={{ width: 10, height: 10, marginTop: 5, backgroundColor: '#000000' }}></View>
            );
        }
    }

    renderSituacao = (situacao) => {
        if (situacao === 3) {
            return (
                <Text>Em Andamento</Text>
            );
        } else if (situacao === 4) {
            return (
                <Text>Concluído</Text>
            );
        } else if (situacao === 7) {
            return (
                <Text>Atraso</Text>
            );
        } else if (situacao === 8) {
            return (
                <Text>Pode iniciar</Text>
            );
        } else if (situacao === 9) {
            return (
                <Text>Parado</Text>
            );
        } else {
            return (
                <Text>Desconhecida</Text>
            );
        }
    }

    render() {
        return (
            <View style={estilo.body}>
                <Loading hide={this.state.isLoading}></Loading>
                <Content padder>
                    <View style={estilo.header}>
                        <Image style={estilo.logo} source={require('../img/logo-e-titulo-login-pb.png')} />
                        {/* <HeaderPB /> */}
                    </View>
                    {this.state.projetos.map((item, key) => (
                        <View key={key}
                            style={{ backgroundColor: 'white', marginBottom: 10 }}>
                            <Collapse onPress={this.alteraLogo} >
                                <CollapseHeader style={{
                                    backgroundColor: '#dcdcdc', paddingRight: '8%', paddingLeft: '8%', paddingTop: 8, paddingBottom: 5
                                }}>
                                    <View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            maxWidth: '90%'
                                        }}>
                                            <Text style={{
                                                color: 'black',
                                                fontWeight: 'normal',
                                                fontSize: 14
                                            }}>Projeto: </Text>
                                            <Text style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: 14
                                            }}>{item.nome}
                                            </Text>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: "space-around",
                                            marginBottom: 10,
                                            paddingBottom: 10,
                                            paddingTop: 8,
                                            borderBottomColor: '#c1c1c1',
                                            borderBottomWidth: 1.0
                                        }}>
                                            <View>
                                                <Text style={{
                                                    color: 'black',
                                                    fontSize: 12
                                                }}>Fim Previsto: {item.fimPrevisto}
                                                </Text>
                                            </View>

                                            {this.renderCorSituacao(item.situacao)}

                                            <View style={{ justifyContent: 'flex-start' }}>
                                                <Text style={{
                                                    color: 'black',
                                                    fontSize: 12,
                                                }}>
                                                    {this.renderSituacao(item.situacao)}
                                                </Text>
                                            </View>

                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            paddingEnd: 20,
                                            marginBottom: 10
                                        }}>
                                            <Thumbnail style={{ width: 25, height: 25 }} source={require('../img/ico-abrir-box.png')} />
                                        </View>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    paddingTop: 22,
                                    paddingLeft: 22
                                }}>

                                    {item.componentes.map((comp, key) => (
                                        <View key={key} style={{ paddingTop: 20 }}>
                                            <View>

                                                <Text style={{
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    fontSize: 16
                                                }}>{comp.nome} </Text>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: "space-around",
                                                marginBottom: 10,
                                                paddingBottom: 10,
                                                paddingTop: 8,
                                                borderBottomColor: '#c1c1c1',
                                                borderBottomWidth: 1.0
                                            }}>
                                                <View style={{ flex: 1, justifyContent: 'flex-start', marginStart: 0 }}>
                                                    <Text style={{
                                                        color: 'black',
                                                        fontSize: 12,
                                                    }}>Fim Previsto: {comp.fimPrevisto}
                                                    </Text>
                                                </View>

                                                {this.renderCorSituacao(comp.situacao)}

                                                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                                    <Text style={{
                                                        color: 'black',
                                                        paddingLeft: 10,
                                                        fontSize: 12
                                                    }}>
                                                        {this.renderSituacao(comp.situacao)}
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>

                                    ))}
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
        width: wp('80%'),
        height: hp('10%'),
        marginTop: hp('8%'),
        justifyContent: 'center',
        margin: wp('10%')
    },
    logo: {
        width: wp('80%'),
        height: hp('30%'),
        resizeMode: 'contain',
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