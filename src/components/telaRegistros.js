import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';

import axios from '../services/axios';

import {
    Container,
    Header,
    Content,
    Button,
    Left,
    Right,
    Body,
    Text,
    CardItem
} from "native-base";

export default class telaRegistros extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registros: [],
            envolvimentos: []
        }
    }

    async componentDidMount() {
        let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token'); //treinamentos em gerenciamentos de projetos

        axios.post('/v1/registro/listar', { "tarefa": this.props.comp.id }, { headers: { Authorization: 'Bearer ' + tokenPB } })
            .then(response => {
                this.setState({ registros: response.data.lista })
            }).catch(error => {
                console.log('Error: ' + error);
            });

        axios.post('/v1/envolvimento/listar', { "idTarefa": this.props.comp.id }, { headers: { Authorization: 'Bearer ' + tokenPB } })
            .then(response => {
                this.setState({ envolvimentos: response.data.lista });
                console.log(response);
            })

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
                <Text style={{ textAlign: 'left' }}>Em andamento</Text>
            );
        } else if (situacao === 4) {
            return (
                <Text style={{ textAlign: 'left' }}>Concluído</Text>
            );
        } else if (situacao === 7) {
            return (
                <Text style={{ textAlign: 'left' }}>Em atraso</Text>
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

    telaAnterior = () => {
        Actions.pop();
    }

    telaProjetos = () => {
        Actions.popTo('TelaProjetos');
    }

    render() {
        return (
            <Container>
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
                            <Text style={{ textAlign: 'right', color: '#6c6c6c', paddingRight: wp('5%'), fontWeight: '900' }}>{this.props.org}.</Text>
                            <Text style={{ textAlign: 'right', paddingRight: wp('5%') }}>{this.props.user}</Text>
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
                    }}>REGISTROS</Text>
                    <View>

                        <TouchableOpacity onPress={() => this.telaProjetos()}>
                            <CardItem style={{ backgroundColor: '#c1c1c1', minHeight: 50 }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Left>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: '900',
                                            fontSize: 14,
                                            position: 'absolute'
                                        }}>{this.props.proj.nome}</Text>
                                    </Left>

                                    {/* <Right>
                                        <View>
                                            <Image style={estilo.icoSeta} source={require('../img/seta-voltar-preta.png')} />
                                        </View>
                                    </Right> */}

                                </View>
                            </CardItem>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.telaAnterior()}>
                            <CardItem style={{ backgroundColor: '#f4f4f4', minHeight: 50 }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Left>
                                        <Image style={estilo.icoSeta} source={require('../img/seta-voltar-preta.png')} />
                                    </Left>

                                    <View>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: '900',
                                            fontSize: 14,
                                            maxWidth: wp('80%')
                                        }}>{this.props.comp.nome} - {this.props.proj.nome}</Text>
                                    </View>
                                </View>
                            </CardItem>
                            <CardItem>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Left>
                                        <Text style={{
                                            color: 'black',
                                            fontSize: 12,
                                            paddingRight: wp('10%')
                                        }}>Fim previsto <Text style={{ fontWeight: '900', fontSize: 12 }}> {this.props.comp.fimPrevisto}</Text>
                                        </Text>
                                    </Left>
                                    <View style={{ justifyContent: 'flex-start', flex: 1, flexDirection: 'row' }}>
                                        <View>
                                            {this.renderCorSituacao(this.props.comp.situacao)}
                                        </View>
                                        <Text style={{
                                            color: 'black',
                                            fontSize: 12,
                                            textAlign: 'left',
                                            paddingLeft: wp('2%')
                                        }}>
                                            {this.renderSituacao(this.props.comp.situacao)}
                                        </Text>
                                    </View>
                                </View>
                            </CardItem>
                        </TouchableOpacity>

                        <View>
                            {/* {this.state.envolvimentos.map((item, keyEnv) => (
                                <View key={keyEnv}>
                                    {item.idUsuario === 5115 ?
                                        <View>
                                            <CardItem style={{ flexDirection: 'row', backgroundColor: '#dcdcdc' }}>
                                                <Left>
                                                <Text style={{ fontSize: 12, backgroundColor: '#ffffff', paddingLeft: 10, paddingRight: 10, borderRadius: 100 / 20 }}>
                                                    <Text style={{ color: '#2768ab', fontWeight: '900' }}>{item.idEnvolvimento} </Text>
                                                </Text>
                                                </Left>
                                                    <Text style={{ textAlign: 'left' }}>
                                                        <Text style={{ fontWeight: '600', fontSize: 14 }}>{this.props.proj.nome}</Text>
                                                    </Text>
                                            </CardItem>
                                        </View> : <View></View>}
                                </View>

                            ))} */}

                            {/* <CardItem style={{ flexDirection: 'row', backgroundColor: '#dcdcdc' }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Right>
                                        <Text style={{ fontSize: 12 }}>fim previsto <Text style={{ fontWeight: '600', fontSize: 12 }}>{this.props.proj.fimPrevisto}</Text></Text>
                                    </Right>
                                </View>
                            </CardItem> */}

                            {this.state.registros !== undefined ?
                                <View>
                                    {this.state.registros.map((item, key) => (
                                        <View key={key}>
                                            {item !== undefined && item.descricao !== '' && item.descricao !== undefined && item.descricao !== null ?
                                                <CardItem style={{
                                                    backgroundColor: '#f4f4f4',
                                                    borderBottomColor: '#c1c1c1',
                                                    borderBottomWidth: 1.0,
                                                }}>
                                                    <View>
                                                        <Text> <Text style={{ fontSize: 16 }}>Comentário: </Text> <Text> {'\n'} </Text> <Text style={{ fontWeight: '400', fontSize: 12 }}>{item.descricao}</Text></Text>
                                                        {/* <Right><Text style={{ fontSize: 12, color: '#a3a3a3' }}>Autor: Luiz Braum</Text></Right> */}
                                                    </View>
                                                    <Right>
                                                        <Text style={{ fontWeight: '400', fontSize: 12 }}>{item.data} </Text>
                                                    </Right>
                                                </CardItem> : <View style={{ display: 'none', width: 0, height: 0 }}></View>
                                            }

                                        </View>

                                    ))}
                                </View> : <View style={{ display: 'none', width: 0, height: 0 }}></View>
                            }
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const estilo = StyleSheet.create({
    logoStyle: {
        width: wp('30%'),
        height: hp('35%'),
        resizeMode: 'contain'
    },

    icoSeta: {
        width: wp('3%'),
        height: hp('3%'),
        resizeMode: 'contain'
    }
})