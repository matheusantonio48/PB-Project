import React, { Component } from "react";
import { StyleSheet, Image, View } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

        }
    }

    render() {
        return (
            <Container>
                <Header transparent style={{ backgroundColor: 'white' }}>
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
                            <Text style={{ textAlign: 'right', paddingRight: wp('5%'), fontWeight: '900' }}>Organização {this.state.organizacao}.</Text>
                            <Text style={{ textAlign: 'right', paddingRight: wp('5%') }}>{this.state.usuario}</Text>
                        </View>

                    </Right>
                </Header>

                <Content padder style={{ width: wp('100%') }}>
                    <Text style={{ fontWeight: '900', fontSize: 25 }}>REGISTROS</Text>
                    <View>

                        <View>
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
                                        }}>PROJETO NomeProjeto</Text>
                                    </Left>

                                    <Right>
                                        <View>
                                            <Image style={estilo.icoSeta} source={require('../img/ico-seta-esq-fechar.png')} />
                                        </View>
                                    </Right>

                                </View>
                            </CardItem>
                        </View>

                        <View>
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
                                        }}>TAREFA NomeTarefa - NomeProjeto</Text>
                                    </Left>

                                    <Right>
                                        <View>
                                            <Image style={estilo.icoSeta} source={require('../img/ico-seta-esq-fechar.png')} />
                                        </View>
                                    </Right>

                                </View>
                            </CardItem>
                        </View>

                        <View>
                            <CardItem style={{ flexDirection: 'row', backgroundColor: '#dcdcdc' }}>
                                <Left>
                                    <Text style={{ textAlign: 'left' }}>
                                        <Text style={{ fontWeight: '600', fontSize: 14 }}>Testes app fase 02 - Desenvolvimento</Text>
                                    </Text>
                                </Left>
                                <Text style={{ fontSize: 12, backgroundColor: '#ffffff', paddingLeft: 10, paddingRight: 10, borderRadius: 100 / 20 }}>
                                    <Text style={{ color: '#2768ab', fontWeight: '900' }}>EQ </Text>
                                    <Text style={{ fontSize: 12 }}>[ p3 ]</Text>
                                </Text>
                            </CardItem>

                            <CardItem style={{ flexDirection: 'row', backgroundColor: '#dcdcdc' }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Left>
                                        <Text style={{ fontSize: 12 }}>Publicado por: <Text style={{ fontWeight: '600', fontSize: 12 }}>Luiz Braum</Text></Text>
                                    </Left>
                                    <Right>
                                        <Text style={{ fontSize: 12 }}>Fim previsto: <Text style={{ fontWeight: '600', fontSize: 12 }}>19/04/2019</Text></Text>
                                    </Right>
                                </View>
                            </CardItem>

                            <CardItem style={{
                                borderBottomColor: '#c1c1c1',
                                borderBottomWidth: 1.0,
                            }}>
                                <View>
                                    <Text> <Text style={{ fontSize: 16 }}>Comentário: </Text> <Text style={{ fontWeight: '400', fontSize: 12 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a arcu condimentum, ullamcorper arcu non, sodales odio. Morbi non ex scelerisque, tristique sapien et, tempor orci. Fusce tristique orci eu lorem pharetra bibendum. Nulla consequat, erat id hendrerit feugiat, orci turpis blandit risus, vitae efficitur quam quam vitae metus. Nulla maximus magna at nunc finibus, interdum eleifend est porta. Cras a finibus mi. Proin eros turpis, rhoncus vel erat sit amet, bibendum vulputate velit. Praesent tincidunt eget orci vitae porta. Duis vehicula lacinia nibh, et elementum velit. Sed id purus in justo sollicitudin viverra vel ut massa. Duis sagittis eleifend neque eget porta.</Text></Text>
                                    <Right><Text style={{ fontSize: 12, color: '#a3a3a3' }}>Autor: Luiz Braum</Text></Right>
                                </View>
                            </CardItem>
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