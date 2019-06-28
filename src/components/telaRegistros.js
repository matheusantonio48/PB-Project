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
                            <Text style={{ textAlign: 'right', color: '#6c6c6c', paddingRight: wp('5%'), fontWeight: '900' }}>Organização {this.props.org}.</Text>
                            <Text style={{ textAlign: 'right', paddingRight: wp('5%') }}>{this.props.user}</Text>
                        </View>

                    </Right>
                </Header>

                <Content padder style={{ width: wp('100%') }}>
                    <Text style={{
                        fontWeight: '900',
                        color: '#313131',
                        backgroundColor: '#f4f4f4',
                        fontSize: 25,
                        paddingLeft: '3%',
                        paddingTop: hp('2%'),
                        paddingBottom: hp('2%')
                    }}>REGISTROS</Text>
                    <View>

                        <TouchableOpacity onPress={() => this.telaProjetos()}>
                            <CardItem>
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

                                    <Right>
                                        <View>
                                            <Image style={estilo.icoSeta} source={require('../img/ico-seta-esq-fechar.png')} />
                                        </View>
                                    </Right>

                                </View>
                            </CardItem>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.telaAnterior()}>
                            <CardItem>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Left>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: '900',
                                            fontSize: 14,
                                            position: 'absolute',
                                            maxWidth: wp('80%')
                                        }}>{this.props.comp.nome} - {this.props.proj.nome}</Text>
                                    </Left>

                                    <Right>
                                        <Image style={estilo.icoSeta} source={require('../img/ico-seta-esq-fechar.png')} />
                                    </Right>

                                </View>
                            </CardItem>
                        </TouchableOpacity>

                        <View>
                            {this.state.envolvimentos.map((item, keyEnv) => (
                                <View key={keyEnv}>
                                    {item.idUsuario === 5115 ?
                                        <View>
                                            <CardItem style={{ flexDirection: 'row', backgroundColor: '#dcdcdc' }}>
                                                <Left>
                                                    <Text style={{ textAlign: 'left' }}>
                                                        <Text style={{ fontWeight: '600', fontSize: 14 }}>{this.props.proj.nome}</Text>
                                                    </Text>
                                                </Left>
                                                <Text style={{ fontSize: 12, backgroundColor: '#ffffff', paddingLeft: 10, paddingRight: 10, borderRadius: 100 / 20 }}>
                                                    <Text style={{ color: '#2768ab', fontWeight: '900' }}>{item.idEnvolvimento} </Text>
                                                    {/* <Text style={{ fontSize: 12 }}>[ p3 ]</Text> */}
                                                </Text>
                                            </CardItem>
                                        </View> : <View></View>}
                                </View>

                            ))}

                            <CardItem style={{ flexDirection: 'row', backgroundColor: '#dcdcdc' }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Left>
                                        {/* <Text style={{ fontSize: 12 }}>Publicado por: <Text style={{ fontWeight: '600', fontSize: 12 }}>Luiz Braum</Text></Text> */}
                                    </Left>
                                    <Right>
                                        <Text style={{ fontSize: 12 }}>Fim previsto: <Text style={{ fontWeight: '600', fontSize: 12 }}>{this.props.proj.fimPrevisto}</Text></Text>
                                    </Right>
                                </View>
                            </CardItem>

                            {this.state.registros !== undefined ?
                                <View>
                                    {this.state.registros.map((item, key) => (
                                        <View key={key}>
                                            {item !== undefined && item.descricao !== '' && item.descricao !== undefined && item.descricao !== null ?
                                                <CardItem style={{
                                                    borderBottomColor: '#c1c1c1',
                                                    borderBottomWidth: 1.0,
                                                }}>
                                                    <View>
                                                        <Text> <Text style={{ fontSize: 16 }}>Comentário: </Text> <Text style={{ fontWeight: '400', fontSize: 12 }}>{item.descricao}</Text></Text>
                                                        {/* <Right><Text style={{ fontSize: 12, color: '#a3a3a3' }}>Autor: Luiz Braum</Text></Right> */}
                                                    </View>
                                                </CardItem> : <View></View>
                                            }

                                        </View>

                                    ))}
                                </View> : <View></View>
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
        width: wp('45%'),
        height: hp('50%'),
        resizeMode: 'contain'
    },

    icoSeta: {
        width: wp('3%'),
        height: hp('3%'),
        resizeMode: 'contain'
    }
})