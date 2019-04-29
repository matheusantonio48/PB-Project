import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Plataform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    TextInput
} from 'react-native';


export default class telaLogin extends Component {

    render() {
        return (
            <ImageBackground
                source={require("../img/background.png")}
                style={estilo.imgBackground}>
                <View style={estilo.principal}>
               
                    <View style={estilo.header}>
                    <Image style={estilo.logo} source={require('../img/logo-e-titulo-login-pb.png')} />
                     </View>
                    
                    <View style={estilo.body}>

                        <TextInput
                            style={estilo.entrada}
                            underlineColorAndroid='transparent'
                            placeholder="ORGANIZAÇÃO"
                            placeholderTextColor="black" />

                        <TextInput

                            style={estilo.entrada}
                            underlineColorAndroid='transparent'
                            placeholder="LOGIN"
                            placeholderTextColor="black" />

                        <TextInput

                            style={estilo.entrada}
                            underlineColorAndroid='transparent'
                            placeholder="SENHA"
                            placeholderTextColor="black" />

                        <TouchableOpacity onPress={() => { Actions.TelaMenu(); }} >
                            <Image style={estilo.buttonStyle} source={require('../img/bt-entrar.png')} />
                        </TouchableOpacity>
                    </View>
               
                </View>

            </ImageBackground>

        );
    }
}
const estilo = StyleSheet.create({
    entrada: {
        width: wp ('50%'),
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
        alignItems:'center',
        width: wp('80%'),
        height: hp('10%'),
        marginTop: hp ('8%'),
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
        paddingTop: '3%',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'column',

      
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