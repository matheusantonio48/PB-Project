import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import { StackActions } from 'react-navigation';

import {
  Container,
  Header,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem
} from "native-base";

import axios from '../services/axios';

export default class telaTarefasResumo extends Component {
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
      comps: [],
      componentes: [],
      comentarios: [],
      envolvimento: [],
      registro: [],
      idPessoa: []
    }
  }

  async componentWillMount() {
    this.state.projetos = this.props.proj;
    updateState = (response) => {
      this.setState({ componentes: response });
    }

    let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');
    let componenteCompleto = []
    componenteCompleto.push(this.state.projetos);

    axios.post('/v1/componente/listar', { "id": this.props.proj.id, "somenteUltimoNivel": 1 }, { headers: { Authorization: 'Bearer ' + tokenPB } })
      .then(responseComp => {
        updateState(responseComp.data.lista);
        responseComp.data.lista.forEach(componente => {
          axios.post('/v1/envolvimento/listar', { 'idTarefa': componente.id }, { headers: { Authorization: 'Bearer ' + tokenPB } }) // 5115
            .then(response => {
              this.setState({ envolvimento: response.data.lista })
              // console.log(response);
            }).catch(error => {
              console.log('Error: ' + error);
            });
        })
      }).catch(error => {
        console.log('Error: ' + error);
      });
  }

  async componentDidMount() {
    let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');
    axios.post('/v1/registro/listar', { 'tarefa': this.props.proj.id }, { headers: { Authorization: 'Bearer ' + tokenPB } })
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.log('Error: ' + error);
      });

  }

  telaAnterior = () => {
    Actions.pop();
  }

  proximaTela(comp) {
    Actions.TelaRegistros({ proj: this.props.proj, comp: comp, org: this.props.org, user: this.props.user });
    const resetAction = StackActions.reset({
      index: 0,
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
        <Text style={{ textAlign: 'left', fontSize: 12 }}>Em Andamento</Text>
      );
    } else if (situacao === 4) {
      return (
        <Text style={{ textAlign: 'left', fontSize: 12 }}>Concluído</Text>
      );
    } else if (situacao === 7) {
      return (
        <Text style={{ textAlign: 'left', fontSize: 12 }}>Em Atraso</Text>
      );
    } else if (situacao === 8) {
      return (
        <Text style={{ textAlign: 'left', fontSize: 12 }}>Pode iniciar</Text>
      );
    } else if (situacao === 9) {
      return (
        <Text style={{ textAlign: 'left', fontSize: 12 }}>Parado</Text>
      );
    } else {
      return (
        <Text style={{ textAlign: 'left', fontSize: 12 }}>Desconhecida</Text>
      );
    }
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
              <Image style={styles.logoStyle} source={require('../img/logo-internas-pb.png')} />
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

        <Content>
          <Text style={{
            fontWeight: '900',
            color: '#313131',
            backgroundColor: '#f4f4f4',
            fontSize: 20,
            paddingLeft: '3%',
            paddingTop: hp('2%'),
            paddingBottom: hp('2%')
          }}>REGISTROS</Text>
          <Card>
            <TouchableOpacity onPress={() => this.telaAnterior()}>
              <CardItem style={{
                borderBottomColor: '#c1c1c1',
                borderBottomWidth: 1.0,
                backgroundColor: '#dcdcdc'
              }}>
                <Body style={{
                  flex: 1,
                  flexDirection: 'row'
                }}>
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
                      }}>{this.props.proj.nome}
                      </Text>
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
                        }}>fim Previsto <Text style={{ fontWeight: '900', fontSize: 12 }}> {this.props.proj.fimPrevisto}</Text>
                        </Text>
                      </View>


                      <View style={{ justifyContent: 'flex-start', flex: 1, flexDirection: 'row' }}>
                        {this.renderCorSituacao(this.props.proj.situacao)}
                        <Text style={{
                          color: 'black',
                          fontSize: 12,
                          textAlign: 'left',
                          paddingLeft: wp('2%')
                        }}>
                          {this.renderSituacao(this.props.proj.situacao)}
                        </Text>
                      </View>

                      <View>
                        <Image style={styles.icoSeta} source={require('../img/ico-seta-esq-fechar-white.png')} />
                      </View>

                    </View>
                  </View>
                </Body>
              </CardItem>
            </TouchableOpacity>
            <View>
              <View>
                {this.state.componentes.map((item, key) => (
                  <TouchableOpacity key={key} onPress={() => this.proximaTela(item)}>
                    <View>
                      {/* {item.fimReal === '' || (item.inicioReal !== '' && item.inicioPrevisto !== '') ? */}
                      {item.id === 19190 || item.id === 19716 || item.id === 19191 || item.id === 19192 || item.id === 21410 ?
                        <View>
                          <CardItem style={{ flex: 1, flexDirection: 'row' }}>
                            <Body style={{ flex: 1 }}>
                              <View>
                                <Text style={{ textAlign: 'left' }}>
                                  <Text style={{ fontWeight: '600', fontSize: 14 }}> {item.nome} </Text>
                                </Text>
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
                                  }}>fim Previsto <Text style={{ fontWeight: '900', fontSize: 12 }}> {item.fimPrevisto}</Text>
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

                                <View>
                                  <Image style={styles.icoSeta} source={require('../img/ico-seta-esq-abrir.png')} />
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
                            </Body>
                          </CardItem>
                        </View> : <View></View>
                      }
                    </View>
                  </TouchableOpacity>
                ))}

              </View>
            </View>

          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icoSeta: {
    width: wp('3%'),
    height: hp('3%'),
    resizeMode: 'contain'
  },
  logoStyle: {
    width: wp('30%'),
    height: hp('35%'),
    resizeMode: 'contain'
  }
});