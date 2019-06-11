import React, { Component } from "react";
import { StyleSheet, Image, View } from 'react-native';
import { AsyncStorage } from 'react-native';
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
  TouchableOpacity,
  FooterTab,
  Card,
  CardItem
} from "native-base";

import axios from '../services/axios';


class HeaderNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projetos: [],
      componentes: [],
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

  async componentDidMount () {
    let tokenPB = await AsyncStorage.getItem('@ProjectBuilder:token');

    this.props.proj.forEach(componente => {
      axios.post('/v1/componente/listar', { "id": componente.id }, { headers: { Authorization: 'Bearer ' + tokenPB } })
        .then(responseComp => {
          console.log(responseComp);
          // componente.componentes = responseComp.data.lista;
          // projetoComp.push(projeto);
          // updateState(projetoComp);
        }).catch(error => {
          console.log(error);
        });
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
        <Text style={{ textAlign: 'left' }}>Em Andamento</Text>
      );
    } else if (situacao === 4) {
      return (
        <Text style={{ textAlign: 'left' }}>Concluído</Text>
      );
    } else if (situacao === 7) {
      return (
        <Text style={{ textAlign: 'left' }}>Atraso</Text>
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
                    justifyContent: "space-around",
                    marginBottom: 10,
                    paddingBottom: 10,
                    paddingTop: 8
                  }}>
                    <View>
                      <Text style={{
                        color: 'black',
                        fontSize: 12
                      }}>Fim Previsto: <Text style={{ fontWeight: '900' }}>{this.props.proj.fimPrevisto}</Text>
                      </Text>
                    </View>

                    {this.renderCorSituacao(this.props.proj.situacao)}

                    <View style={{ justifyContent: 'flex-start' }}>
                      <Text style={{
                        color: 'black',
                        fontSize: 12,
                        textAlign: 'left'
                      }}>
                        {this.renderSituacao(this.props.proj.situacao)}
                      </Text>
                    </View>

                  </View>
                </View>
              </Body>
            </CardItem>
            
            {/* {this.state.componentes.map((comp, key) => (
              <TouchableOpacity key={key}>
                <CardItem style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View>
                    <Text style={{fontSize: 12, textAlign: 'left'}}> {comp.inicioPrevisto}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, textAlign: 'left'}}>Fim Previsto: {this.props.comp.fimPrevisto}</Text>
                  </View>
                </CardItem>
              </TouchableOpacity>
            ))} */}

          </Card>
        </Content>
        <Footer >
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
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  logoStyle: {
    width: wp('45%'),
    height: hp('50%'),
    resizeMode: 'contain'
  }
});

export default HeaderNB;