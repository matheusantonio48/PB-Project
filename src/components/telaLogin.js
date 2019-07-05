import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { StackActions, NavigationActions } from 'react-navigation';

import { Actions } from 'react-native-router-flux';

import { Plataform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Container, Header, Content, Item, Input, Icon } from 'native-base';

import axios from '../services/axios';

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';


// http://179.107.43.8:8080/apiPb/api/login
export default class telaLogin extends Component {
    updateValue(text, field) {
        if (field == 'texto') {
            this.setState({
                texto: text
            })
        }
    }

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    state = {
        organizacao: '',
        login: '',
        senha: '',
        erro: '',
        data: '',
        borderColorOrganizacao: '#e5e5e5',
        borderColorIdentificacao: '#e5e5e5',
        borderColorSenha: '#e5e5e5'
    }

    onFocusOrganizacao() {
        this.setState({
            borderColorOrganizacao: '#64d4ff'
        })
    }

    onFocusIdentificacao() {
        this.setState({
            borderColorIdentificacao: '#64d4ff'
        })
    }
    onFocusSenha() {
        this.setState({
            borderColorSenha: '#64d4ff'
        })
    }

    onBlurOrganizacao() {
        this.setState({
            borderColorOrganizacao: '#e5e5e5'
        })
    }

    onBlurIdentificacao() {
        this.setState({
            borderColorIdentificacao: '#e5e5e5'
        })
    }
    onBlurSenha() {
        this.setState({
            borderColorSenha: '#e5e5e5'
        })
    }



    handleOrganizationChange = (organizacao) => {
        this.setState({ organizacao });
    };

    handleLoginChange = (login) => {
        this.setState({ login });
    };

    handlePasswordChange = (senha) => {
        this.setState({ senha });
    };

    handleSignInPress = async () => {
        if (this.state.login.length === 0 || this.state.senha.length === 0) {
            this.setState({ erro: 'Preencha usuário e senha para continuar.' }, () => false);
        } else {
            try {
                let url = '/login?apiName=' + this.state.organizacao + "/" + this.state.login + "&apiKey=" + this.state.senha;
                // console.log(url);
                await axios.post(url).then(response => {
                    this.state.data = response.data;
                    // console.log(response.data);
                });

                await AsyncStorage.setItem('@ProjectBuilder:token', this.state.data.access_token);

                // const resetAction = StackActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'TelaProjetos' }),
                //     ],
                // });
                Actions.TelaProjetos({ organizacao: this.state.organizacao, login: this.state.login });
                // this.props.navigation.dispatch(resetAction);
            } catch (err) {
                this.setState({ erro: 'Houve um problema com o login, verifique suas credenciais.' });
            }
        }
    };

    render() {
        return (
            <KeyboardAvoidingView
            style={estilo.principal}
            behavior="padding">
                <StatusBar hidden />
                <Container style={estilo.body}>
                    <View style={estilo.header}>
                        <Image style={estilo.logo} source={require('../img/logo-e-titulo-login-pb.png')} />
                    </View>
                        <View>
                            <Item>
                                <Image style={estilo.iconForm} source={require('../img/ico-login-organizacao.png')} />
                                <Input
                                    style={{
                                        width: wp('50%'),
                                        paddingLeft: wp('5%'),
                                        height: 55,
                                        borderRadius: 10,
                                        borderStyle: 'solid',
                                        borderColor: this.state.borderColorOrganizacao,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        overflow: 'hidden',
                                        fontSize: 16
                                    }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.organizacao}
                                    onFocus={() => this.onFocusOrganizacao()}
                                    onBlur={() => this.onBlurOrganizacao()}
                                    onChangeText={this.handleOrganizationChange}
                                autoCapitalize="none"
                                    placeholder="Organização"
                                    placeholderTextColor="#9d9d9d" />
                            </Item>

                            <Item>
                                <Image style={estilo.iconForm} source={require('../img/ico-login-identificacao.png')} />
                                <Input
                                    style={{
                                        width: wp('50%'),
                                        paddingLeft: wp('5%'),
                                        height: 55,
                                        borderRadius: 10,
                                        borderStyle: 'solid',
                                        borderColor: this.state.borderColorIdentificacao,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        overflow: 'hidden',
                                        fontSize: 16
                                    }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.login}
                                    onFocus={() => this.onFocusIdentificacao()}
                                    onBlur={() => this.onBlurIdentificacao()}
                                    onChangeText={this.handleLoginChange}
                                    autoCapitalize="none"
                                    placeholder="Identificação"
                                    placeholderTextColor="#9d9d9d" />

                            </Item>

                            <Item>
                                <Image style={estilo.iconForm} source={require('../img/ico-login-senha.png')} />
                                <Input
                                    secureTextEntry={true}
                                    style={{
                                        width: wp('50%'),
                                        paddingLeft: wp('5%'),
                                        height: 55,
                                        borderRadius: 10,
                                        borderStyle: 'solid',
                                        borderColor: this.state.borderColorSenha,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        overflow: 'hidden',
                                        fontSize: 16
                                    }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.senha}
                                    onFocus={() => this.onFocusSenha()}
                                    onBlur={() => this.onBlurSenha()}
                                    onChangeText={this.handlePasswordChange}
                                autoCapitalize="none"
                                    placeholder="Senha"
                                    placeholderTextColor="#9d9d9d" />
                            </Item>


                            <Text style={estilo.mensagemErro}>{this.state.erro.length !== 0 && this.state.erro}</Text>

                            <TouchableOpacity onPress={this.handleSignInPress} >
                                <Image
                                    style={estilo.buttonStyle}
                                    source={require('../img/bt-entrar.png')} />
                            </TouchableOpacity>

                        <View style={{ height: 100 }} />

                        </View>

                </Container>

            </KeyboardAvoidingView>


        );
    }
}
const estilo = StyleSheet.create({
    entrada: {
        width: wp('50%'),
        paddingLeft: wp('5%'),
        height: 55,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 10,
        overflow: 'hidden',
        fontSize: 16
    },

    header: {
        alignItems: 'center',
        width: wp('80%'),
        height: hp('10%'),
        marginTop: hp('8%'),
        marginBottom: hp('15%'),
        justifyContent: 'center',
        margin: wp('10%')
    },


    logo: {
        width: wp('80%'),
        height: hp('30%'),
        resizeMode: 'contain',
    },

    principal: {
        flex: 1,
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
        width: '100%',
        height: '100%',
        paddingTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',


    },

    mensagemErro: {
        color: 'red'
    },

    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        width: wp('60%'),
        height: hp('10%'),
        resizeMode: 'contain'

    },

    logoFooter: {
        width: wp('35%'),
        height: hp('6%'),
        resizeMode: 'contain'
    },

    iconForm: {
        width: wp('5%'),
        marginRight: wp('3%'),
        resizeMode: 'contain'
    }

});