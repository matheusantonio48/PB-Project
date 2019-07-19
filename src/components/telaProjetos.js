import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AsyncStorage from '@react-native-community/async-storage';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
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
    TouchableWithoutFeedback,
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

        this.icons = {     //Step 2
            'up': require('../img/seta-abrir-atividades.png'),
            'down': require('../img/seta-fechar-atividades.png'),
            'right': require('../img/seta-avancar-preta.png')
        };

        this.state = {
            projetos: [],
            collapsed: false,
            componentes: [],
            icons: [],
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

    proximaTela(proj, comp) {
        Actions.TelaRegistros({ proj: proj, comp: comp, org: this.state.organizacao, user: this.state.usuario });
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

    addInArray(id) {
        this.state.icons.push({
            'icons': [id, this.icons.up, false, this.icons.right]
        })
        // console.log(this.state.icons)
    }

    getIcons(id_item) {
        for (i = 0; i < this.state.icons.length; i++) {
            if (this.state.icons[i].icons[0] === id_item) {
                return this.state.icons[i].icons[1]
            }
        }
        return this.icons.up
    }

    getIconRight(id_item) {
        for (i = 0; i < this.state.icons.length; i++) {
            if (this.state.icons[i].icons[0] === id_item) {
                return this.state.icons[i].icons[3]
            }
        }
        return this.icons.up
    }

    setIcon(id) {
        const newArray = this.state.icons;
        console.log(newArray)
        for (i = 0; i < newArray.length; i++) {
            if (newArray[i].icons[0] === id) {
                if (newArray[i].icons[2] === false) {
                    console.log(newArray[i].icons[1]);
                    newArray[i].icons[1] = this.icons.down
                    newArray[i].icons[3] = null
                    newArray[i].icons[2] = true
                    this.setState({ icons: newArray });
                } else if (newArray[i].icons[2] === true) {
                    newArray[i].icons[1] = this.icons.up
                    newArray[i].icons[3] = this.icons.right
                    newArray[i].icons[2] = false
                    this.setState({ icons: newArray });
                }
            }
        }
        return true
    }

    getCollapse(id_item){
        for (i=0;i<this.state.icons.length;i++){
            if(this.state.icons[i].icons[0] === id_item){
                return this.state.icons[i].icons[2]
            }
        }
        return this.icons.up
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
                            style={{ backgroundColor: 'white', marginBottom: 0.5 }}>

                            {item.fimReal === '' && item.id === 19186 || item.id === 19707 || item.id === 21399 ?
                                <View style={{ backgroundColor: '#dcdcdc' }}>
                                    <TouchableOpacity onPress={() => this.mudaTelaRegistroProjeto(item, item.componentes)}>
                                        <View style={{ paddingLeft: 15 }}>
                                            {this.addInArray(item.id)}
                                            <View style={{
                                                flex: 1,
                                                backgroundColor: '#dcdcdc',
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
                                                    }}>Fim previsto <Text style={{ fontWeight: '900' }}>{item.fimPrevisto}</Text>
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

                                                {this.state.displayIcon !== true
                                                ?
                                                <View>
                                                    <View style={{ marginLeft: wp('12%') }}>
                                                            <Image style={estilo.icoSeta} source={this.getIconRight(item.id)} />
                                                    </View>
                                                </View> : <View></View>
                                                }

                                            </View>
                                        </View>

                                        <Collapse isCollapsed={this.getCollapse(item.id)} onToggle={()=>this.setIcon(item.id)} style={{
                                                paddingTop: 5,
                                                width: wp('100%')
                                            }}>
                                            <CollapseHeader style={{ paddingLeft: '3%' }}>
                                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                                    <Image style={{ width: wp('5%'), height: hp('1.6%') }} source={this.getIcons(item.id)} />
                                                    </View>
                                            </CollapseHeader>

                                            <CollapseBody style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                backgroundColor: '#FFF',
                                                paddingLeft: 15
                                            }}>

                                                {item.componentes.map((comp, key) => (
                                                    <View key={key}>
                                                        {comp.id === 19190 || comp.id === 19716 || comp.id === 19191 || comp.id === 19192 || comp.id === 21410 ?
                                                            <TouchableOpacity onPress={() => this.proximaTela(item, comp)}>
                                                                <View style={{
                                                                    borderBottomColor: '#c1c1c1',
                                                                    borderBottomWidth: 0.5
                                                                }}>
                                                                    {/* {item.fimReal === '' || (item.inicioReal !== '' && item.inicioPrevisto !== '') ? */}
                                                                    <View>
                                                                        <View>
                                                                            <Text style={{ fontWeight: '600', fontSize: 14 }}> {comp.nome} </Text>
                                                                        </View>
                                                                        <View style={{
                                                                            flex: 1,
                                                                            flexDirection: 'row',
                                                                            marginBottom: 10,
                                                                            width: wp('90%'),
                                                                            paddingBottom: 10,
                                                                            paddingTop: 8
                                                                        }}>
                                                                            <View>
                                                                                <Text style={{
                                                                                    color: 'black',
                                                                                    fontSize: 12,
                                                                                    paddingRight: wp('10%')
                                                                                }}>Fim previsto <Text style={{ fontWeight: '900', fontSize: 12 }}> {comp.fimPrevisto}</Text>
                                                                                </Text>
                                                                            </View>


                                                                            <View style={{ justifyContent: 'flex-start', flex: 1, flexDirection: 'row' }}>
                                                                                {this.renderCorSituacao(comp.situacao)}
                                                                                <Text style={{
                                                                                    color: 'black',
                                                                                    fontSize: 12,
                                                                                    textAlign: 'left',
                                                                                    paddingLeft: wp('2%')
                                                                                }}>
                                                                                    {this.renderSituacao(comp.situacao)}
                                                                                </Text>
                                                                            </View>

                                                                            <View>
                                                                                <Image style={estilo.icoSeta} source={require('../img/ico-seta-esq-abrir.png')} />
                                                                            </View>

                                                                        </View>
                                                                        {/* {this.state.registro.map((reg, keyReg) => ( */}
                                                                        <View>
                                                                            {/* {reg.descricao !== '' ? */}
                                                                            {/* <Text style={{ fontSize: 12 }}> <Text style={{ fontWeight: '600' }}>Comentário: </Text>Teste</Text> */}
                                                                            {/* : <View></View> */}
                                                                            {/* } */}
                                                                        </View>
                                                                        {/* ))} */}
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity> : <View></View>}

                                                    </View>
                                                ))}
                                            </CollapseBody>

                                        </Collapse>
                                    </TouchableOpacity>

                                </View> : <View style={{ display: 'none' }}></View>
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