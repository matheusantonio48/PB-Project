import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AsyncStorage from '@react-native-community/async-storage';
import { Content, Card, CardItem, Footer, FooterTab, Container, Header, Left, Right, Body, Button, Icon, Thumbnail, Accordion, Title, Item, Toast } from "native-base";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
import { Actions } from 'react-native-router-flux';

export default class telaProjetos extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };


    constructor(props) {
        super(props);

        this.state = {
            projetos: [],
            componentes: [],
            isLoading: false,
            nome: null,
            organizacao: this.props.organizacao,
            usuario: this.props.login
        }
    }


    async componentDidMount() {
        updateState = (response, response2) => {
            this.setState({ projetos: response, componentes: response2 });
        }

        updateLoad = () => {
            setTimeout(() => { this.setState({ isLoading: !this.state.isLoading }) }, 2000)
        }

        let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');
        let projetoComp = [];
        axios.get('/v1/projeto/listar', { headers: { Authorization: 'Bearer ' + tokenPB } })
            .then(response => {
                response.data.lista.forEach(function (projeto) {
                    axios.post('/v1/componente/listar', { "id": projeto.id, "somenteUltimoNivel": 1 }, { headers: { Authorization: 'Bearer ' + tokenPB } })
                        .then(responseComp => {
                            projeto.componentes = responseComp.data.lista;
                            projetoComp.push(projeto);
                            updateState(projetoComp, responseComp.data.lista);
                        }).catch(error => {
                            console.log('Error: ' + error);
                        });
                });
            }).catch(error => {
                console.log('Error: ' + error);
            }).finally(function () {
                updateLoad();
            });
    }

    renderCorSituacao = (situacao) => {
        if (situacao === 3) {
            return (
                <View style={{ width: 10, height: 10, borderRadius: 100 / 2, marginTop: 5, backgroundColor: '#FFFF00' }}></View>
            );
        } else if (situacao === 4) {
            return (
                <View style={{ width: 10, height: 10, borderRadius: 100 / 2, marginTop: 5, backgroundColor: '#0000FF' }}></View>
            );
        } else if (situacao === 7) {
            return (
                <View style={{ width: 10, height: 10, borderRadius: 100 / 2, marginTop: 5, backgroundColor: '#FF0000' }}></View>
            );
        } else if (situacao === 8) {
            return (
                <View style={{ width: 10, height: 10, borderRadius: 100 / 2, marginTop: 5, backgroundColor: '#36d925' }}></View>
            );
        } else if (situacao === 9) {
            return (
                <View style={{ width: 10, height: 10, borderRadius: 100 / 2, marginTop: 5, backgroundColor: '#9A62DF' }}></View>
            );
        } else {
            return (
                <View style={{ width: 10, height: 10, borderRadius: 100 / 2, marginTop: 5, backgroundColor: '#000000' }}></View>
            );
        }
    }

    renderSituacao = (situacao) => {
        if (situacao === 3) {
            return (
                <Text style={{ textAlign: 'left' }}>Em Andamento</Text>
            );
        } else if (situacao === 4) {
            return (
                <Text style={{ textAlign: 'left' }}>Concluído</Text>
            );
        } else if (situacao === 7) {
            return (
                <Text style={{ textAlign: 'left' }}>Em Atraso</Text>
            );
        } else if (situacao === 8) {
            return (
                <Text style={{ textAlign: 'left' }}>Pode iniciar</Text>
            );
        } else if (situacao === 9) {
            return (
                <Text style={{ textAlign: 'left' }}>Parado</Text>
            );
        } else {
            return (
                <Text style={{ textAlign: 'left' }}>Desconhecida</Text>
            );
        }
    }

    mudaTelaResumo = (proj, comp) => {
        Actions.TelaTarefasResumo({ proj: proj, comp: comp, org: this.state.organizacao, user: this.state.usuario });
        const resetAction = StackActions.reset({
            index: 0,
        });
    }

    mudaTelaRegistroProjeto = (proj, comp) => {
        Actions.TelaRegistrosProjeto({ proj: proj, comp: comp, org: this.state.organizacao, user: this.state.usuario });
        const resetAction = StackActions.reset({
            index: 0,
        });
    }

    render() {
        return (
            <Container>
                <Loading hide={this.state.isLoading}></Loading>
                <Header transparent style={{
                    backgroundColor: 'white',
                    borderRightColor: '#2768ab',
                    borderRightWidth: 8.0
                }}>
                    <Left>
                        <Button
                            transparent
                        >
                            <Image style={estilo.logoStyle} source={require('../img/logo-internas-pb.png')} />
                        </Button>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <View>
                            <Text style={{ textAlign: 'right', color: '#6c6c6c', paddingRight: wp('5%'), fontWeight: '900' }}>{this.state.organizacao}.</Text>
                            <Text style={{ textAlign: 'right', paddingRight: wp('5%') }}>{this.state.usuario}</Text>
                        </View>

                    </Right>
                </Header>


                <Content style={{ width: wp('100%') }}>
                    <Text style={{
                        fontWeight: '900',
                        color: '#313131',
                        backgroundColor: '#f4f4f4',
                        fontSize: 20,
                        paddingLeft: '3%',
                        paddingTop: hp('2%'),
                        paddingBottom: hp('2%')
                    }}>FOCO</Text>
                    {this.state.projetos.map((item, key) => (
                        <View key={key}
                            style={{ backgroundColor: 'white' }}>

                            {item.fimReal === '' && item.id === 19186 || item.id === 19707 || item.id === 21399 ?
                                <TouchableOpacity onPress={() => this.mudaTelaResumo(item, item.componentes)}>

                                    <Card style={{
                                        backgroundColor: '#dcdcdc',
                                        paddingRight: '8%',
                                        paddingLeft: '1%',
                                        paddingTop: 5,
                                        width: wp('100%')
                                    }}>
                                        <CardItem style={{ backgroundColor: '#dcdcdc' }}>
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
                                                    }}></Text>
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
                                                    marginBottom: 10,
                                                    width: wp('89%'),
                                                    paddingBottom: 5,
                                                    paddingTop: 8
                                                }}>
                                                    {/* <View style={{ paddingRight: wp('2%') }}>
                                                        <Text style={{ fontSize: 12 }}>
                                                            <Text style={{ color: '#2768ab', fontWeight: '900' }}>EQ </Text>
                                                            <Text style={{ fontSize: 12 }}>[ p3 ]</Text>
                                                        </Text>
                                                    </View> */}
                                                    <View>
                                                        <Text style={{
                                                            color: 'black',
                                                            fontSize: 12,
                                                            paddingRight: wp('10%')
                                                        }}>fim Previsto <Text style={{ fontWeight: '900' }}>{item.fimPrevisto}</Text>
                                                        </Text>
                                                    </View>


                                                    <View style={{ justifyContent: 'flex-start', flex: 1, flexDirection: 'row' }}>
                                                        {this.renderCorSituacao(item.situacao)}
                                                        <Text style={{
                                                            color: 'black',
                                                            fontSize: 12,
                                                            textAlign: 'left',
                                                            paddingLeft: wp('2%')
                                                        }}>
                                                            {this.renderSituacao(item.situacao)}
                                                        </Text>
                                                    </View>

                                                    <TouchableOpacity onPress={() => this.mudaTelaRegistroProjeto(item, item.componentes)}>
                                                        <View style={{ marginLeft: wp('12%')}}>
                                                            <Image style={estilo.icoSeta} source={require('../img/seta-avancar-preta.png')} />
                                                        </View>
                                                    </TouchableOpacity>


                                                </View>
                                                {/* <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            paddingEnd: 20,
                                            marginBottom: 10
                                        }}>
                                            <Thumbnail style={{ width: 25, height: 25 }} source={require('../img/ico-abrir-box.png')} />
                                        </View> */}
                                            </View>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity> : <View style={{display: 'none'}}></View>
                            }
                        </View>
                    ))}
                </Content>

            </Container>
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
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        width: wp('90%'),
        height: hp('10%'),
        resizeMode: 'contain'
    },
    icoSeta: {
        width: wp('3%'),
        height: hp('3%'),
        resizeMode: 'contain'
    },
    logoFooter: {
        width: wp('35%'),
        height: hp('6%'),
        resizeMode: 'contain'
    },
    logoStyle: {
        width: wp('30%'),
        height: hp('35%'),
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