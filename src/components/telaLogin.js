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

import * as messageClass from './MessageClass'

import * as constantClass from './ConstantClass'

import { TextField } from 'react-native-material-textfield';

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
    /*updateValue(text, field) {
        if (field == 'texto') {
            this.setState({
                texto: text
            })
        }
    }*/

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
        borderColorOrganizacao: constantClass.colors.gray,
        borderColorIdentificacao: constantClass.colors.gray,
        borderColorSenha: constantClass.colors.gray
    }

    onFocusOrganizacao() {
        this.setState({
            borderColorOrganizacao: constantClass.colors.blue
        })
    }

    onFocusIdentificacao() {
        this.setState({
            borderColorIdentificacao: constantClass.colors.blue
        })
    }
    onFocusSenha() {
        this.setState({
            borderColorSenha: constantClass.colors.blue
        })
    }

    onBlurOrganizacao() {
        this.setState({
            borderColorOrganizacao: constantClass.colors.gray
        })
    }

    onBlurIdentificacao() {
        this.setState({
            borderColorIdentificacao: constantClass.colors.gray
        })
    }
    onBlurSenha() {
        this.setState({
            borderColorSenha: constantClass.colors.gray
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
            this.setState({erro: messageClass.message.loginErr }, () => false);
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
                this.setState({ erro: messageClass.message.credErr });
            }
        }
    };

    render() {
        return (
            <KeyboardAvoidingView
            style={constantClass.loginStyles.principal}
            behavior="padding">
                <StatusBar hidden />
                <Container style={constantClass.loginStyles.body}>
                    <View style={constantClass.loginStyles.header}>
                        <Image style={constantClass.loginStyles.logo} source = {constantClass.images.pbLoginLogoImage} />
                    </View>
                        <View>
                            <Item>
                                <Image style={constantClass.loginStyles.iconForm} source={constantClass.images.pbOrgIcon} />
                                <Input 
                                    style={{
                                        width: wp('90%'),
                                        marginTop: hp('2%'),
                                        borderWidth: 1,
                                        paddingLeft: wp('5%'),
                                        height: 55,
                                        borderRadius: 10,
                                        borderStyle: 'solid',
                                        borderColor: this.state.borderColorOrganizacao,
                                        marginTop: 10,
                                        overflow: 'hidden',
                                        fontSize: 16,
                                        flex :1
                                    }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.organizacao}
                                    onChangeText={this.handleOrganizationChange}
                                    autoCapitalize="none"
                                    placeholder="Organização"
                                    placeholderTextColor="#9d9d9d" />
                            </Item>
                                    
                            <Item>
                                <Image style={constantClass.loginStyles.iconForm} source={constantClass.images.pbIdIcon} />
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
                                <Image style={constantClass.loginStyles.iconForm} source={constantClass.images.pbPassIcon} />
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


                            <Text style={constantClass.loginStyles.mensagemErro}>{this.state.erro.length !== 0 && this.state.erro}</Text>

                            <TouchableOpacity onPress={this.handleSignInPress} >
                                <Image
                                    style={constantClass.loginStyles.buttonStyle}
                                    source={constantClass.images.pbLoginBtn} />
                            </TouchableOpacity>

                        <View style={{ height: 100 }} />

                        </View>

                </Container>

            </KeyboardAvoidingView>


        );
    }
}
/*const estilo = StyleSheet.create({
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

});*/