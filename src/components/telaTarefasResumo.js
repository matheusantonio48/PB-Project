import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  ListItem,
  List,
  Footer,
  FooterTab,
  Card,
  CardItem
} from "native-base";

import { Actions } from 'react-native-router-flux';


class HeaderNB extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.proj);
    this.state = {
      projetos: [],
      componentes: [],
      projetoComp: [],
      nomes: [],
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    };
  }
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
  }

  async componentDidMount() {
    updateState = (response) => {
      this.setState({ componentes: response });
    }

    this.props.proj.componentes.forEach(componente => {
      this.state.projetoComp.push(componente);
      this.state.nomes.push(componente.nome);
    });

    // console.log(this.state.projetoComp);
  }

  telaAnterior = () => {
    Actions.pop();
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
        <Text style={{ textAlign: 'left', fontSize: 12 }}>Atraso</Text>
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
      <Container style={styles.container}>
        <Header transparent style={{ backgroundColor: 'white' }}>
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
              <Text style={{ textAlign: 'right', paddingRight: wp('5%'), fontWeight: '900' }}>Organização {this.props.org}.</Text>
              <Text style={{ textAlign: 'right', paddingRight: wp('5%') }}>{this.props.user}</Text>
            </View>
          </Right>
        </Header>

        <Content>
          <Text style={{ fontWeight: '900', fontSize: 25 }}>REGISTROS</Text>
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
                      }}>Projeto: </Text>
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
                      width: wp('80%'),
                      paddingBottom: 10,
                      paddingTop: 8,
                      borderBottomColor: '#c1c1c1',
                      borderBottomWidth: 1.0
                    }}>
                      <View>
                        <Text style={{
                          color: 'black',
                          fontSize: 12,
                          paddingRight: wp('10%')
                        }}>Fim Previsto: <Text style={{ fontWeight: '900' }}>{this.props.proj.fimPrevisto}</Text>
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

            {/* {this.props.proj.componentes.forEach(comp => {
              <View>
              {console.log(comp.nome)}
                <CardItem style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row' }}>
                  <Text style={{ textAlign: 'left' }}>
                      <Text style={{ fontWeight: '600', fontSize: 14 }}>Nome de teste da tarefa {comp.nome}</Text>
                      </Text>
                      </View>
                      </CardItem>

                <CardItem style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ fontSize: 12 }}>Publicado por: <Text style={{ fontWeight: '600', fontSize: 12 }}>Nome</Text></Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 12 }}>Fim previsto: <Text style={{ fontWeight: '600', fontSize: 12 }}>01/01/2000</Text></Text>
                    </View>
                  </View>
                </CardItem>

                <CardItem style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={{ fontSize: 12 }}> <Text style={{ fontWeight: '600' }}>Comentário: </Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a arcu condimentum, ullamcorper arcu non, sodales odio. Morbi non ex scelerisque, tristique sapien et, tempor orci. Fusce tristique orci eu lorem pharetra bibendum. Nulla consequat, erat id hendrerit feugiat, orci turpis blandit risus, vitae efficitur quam quam vitae metus. Nulla maximus magna at nunc finibus, interdum eleifend est porta. Cras a finibus mi. Proin eros turpis, rhoncus vel erat sit amet, bibendum vulputate velit. Praesent tincidunt eget orci vitae porta. Duis vehicula lacinia nibh, et elementum velit. Sed id purus in justo sollicitudin viverra vel ut massa. Duis sagittis eleifend neque eget porta. </Text>
                  </View>
                </CardItem>
              </View>
            })} */}

          </Card>
          {this.props.proj.componentes.map((comp, key) => {
            { console.log(comp.nome) } 
            <FlatList>
              <Text style={{color: '#000000'}}>{comp.nome}</Text>
            </FlatList>
          })}
          {/* {this.props.proj.componentes.map((comp, key) => {
            { console.log(comp.nome) } 
            <View key={key}>
              <Text>{comp.nome}</Text>
            </View>
          })} */}
        </Content>
        {/* <Footer >
          <FooterTab style={{ backgroundColor: 'white' }}>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()} >
              <Icon style={{ color: '#dcdcdc' }} active={this.state.tab1} name="home" />
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
              <Icon style={{ color: '#dcdcdc' }} active={this.state.tab2} name="area-graph" />
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
              <Icon style={{ color: '#dcdcdc' }} active={this.state.tab3} name="contact" />
            </Button>
            <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
              <Icon style={{ color: '#dcdcdc' }} active={this.state.tab4} name="cog" />
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  icoSeta: {
    width: wp('3%'),
    height: hp('3%'),
    resizeMode: 'contain'
  },
  logoStyle: {
    width: wp('45%'),
    height: hp('50%'),
    resizeMode: 'contain'
  }
});

export default HeaderNB;