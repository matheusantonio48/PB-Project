import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import { Plataform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import axios from '../services/axios';

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    TextInput
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
        data: ''
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

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'TelaProjetos' }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            } catch (err) {
                this.setState({ erro: 'Houve um problema com o login, verifique suas credenciais.' });
            }
        }
    };

    render() {
        return (
            <ImageBackground
                source={require("../img/background.png")}
                style={estilo.imgBackground}>
                <View style={estilo.principal}>
                    <StatusBar hidden />
                    <View style={estilo.header}>
                        <Image style={estilo.logo} source={require('../img/logo-e-titulo-login-pb.png')} />
                    </View>

                    <View style={estilo.body}>

                        <TextInput
                            style={estilo.entrada}
                            underlineColorAndroid='transparent'
                            value={this.state.organizacao}
                            onChangeText={this.handleOrganizationChange}
                            placeholder="ORGANIZAÇÃO"
                            placeholderTextColor="black" />

                        <TextInput
                            style={estilo.entrada}
                            underlineColorAndroid='transparent'
                            value={this.state.login}
                            onChangeText={this.handleLoginChange}
                            placeholder="LOGIN"
                            placeholderTextColor="black" />

                        <TextInput
                            secureTextEntry={true}
                            style={estilo.entrada}
                            underlineColorAndroid='transparent'
                            value={this.state.senha}
                            onChangeText={this.handlePasswordChange}
                            placeholder="SENHA"
                            placeholderTextColor="black" />

                        <Text
                            style={estilo.mensagemErro}>{this.state.erro.length !== 0 && this.state.erro}</Text>

                        <TouchableOpacity onPress={this.handleSignInPress} >
                            <Image
                                style={estilo.buttonStyle}
                                source={require('../img/bt-entrar.png')} />
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>

        );
    }
}
const estilo = StyleSheet.create({
    entrada: {
        width: wp('50%'),
        height: 55,
        borderColor: '#e0e0e0',
        borderWidth: 0,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 12,
        backgroundColor: '#e0e0e0',
        borderWidth: 3,
        marginTop: 10,
        color: 'black',
        overflow: 'hidden',
        fontSize: 22,
        textAlign: 'center',
    },

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
        width: '100%',
        height: '100%',
        paddingTop: '1%',
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

});