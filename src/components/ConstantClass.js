import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const images = {

 pbLoginLogoImage : require ('../img/logo-e-titulo-login-pb.png'),//imagem da pb com logo e texto para a tela de login
 pbOrgIcon : require('../img/ico-login-organizacao.png'),//icone de organizacao
 pbIdIcon : require('../img/ico-login-identificacao.png'),//icone de identificacao
 pbPassIcon : require('../img/ico-login-senha.png'),//icone de senha
 pbLoginBtn : require('../img/bt-entrar.png')//imagem do botao de entrar (tela de login)

}

export const colors = {

darkGray : "#9d9d9d",
gray : "#e5e5e5",
blue : "#64d4ff"

}

export const loginStyles = {

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
        color: 'red',
        marginBottom:40
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
}