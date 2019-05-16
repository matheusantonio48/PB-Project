import React, { Component } from "react";
import { StyleSheet, Image } from 'react-native';
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


class HeaderNB extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.comp);
    //Aqui você dá um console.log pra ver o que ta retonando console.log(this.props);
    //e aqui você retorna assim this.props.seucu
    //sin
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

  renderCorSituacao = (situacao) => {
    if (situacao === 3) {
      return (
        <Container style={{ width: 5, height: 5, marginTop: 5, backgroundColor: '#FFFF00' }}></Container>
      );
    } else if (situacao === 4) {
      return (
        <Container style={{ width: 5, height: 5, marginTop: 5, backgroundColor: '#0000FF' }}></Container>
      );
    } else if (situacao === 7) {
      return (
        <Container style={{ width: 5, height: 5, marginTop: 5, backgroundColor: '#FF0000' }}></Container>
      );
    } else if (situacao === 8) {
      return (
        <Container style={{ width: 5, height: 5, marginTop: 5, backgroundColor: '#36d925' }}></Container>
      );
    } else if (situacao === 9) {
      return (
        <Container style={{ width: 5, height: 5, marginTop: 5, backgroundColor: '#9A62DF' }}></Container>
      );
    } else {
      return (
        <Container style={{ width: 5, height: 5, marginTop: 5, backgroundColor: '#000000' }}></Container>
      );
    }
  }

  renderSituacao = (situacao) => {
    if (situacao === 3) {
      return (
        <Text>Em Andamento</Text>
      );
    } else if (situacao === 4) {
      return (
        <Text>Concluído</Text>
      );
    } else if (situacao === 7) {
      return (
        <Text>Atraso</Text>
      );
    } else if (situacao === 8) {
      return (
        <Text>Pode iniciar</Text>
      );
    } else if (situacao === 9) {
      return (
        <Text>Parado</Text>
      );
    } else {
      return (
        <Text>Desconhecida</Text>
      );
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button
              transparent
            >
              <Icon style={{ color: '#2768ab' }} name="menu" />
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            <Image style={styles.logoStyle} source={require('../img/logo-internas-pb.png')} />
          </Right>
        </Header>
        <Content>
          <Card style={{ backgroundColor: '#dcdcdc' }}>
            <CardItem style={{
              borderBottomColor: '#c1c1c1',
              borderBottomWidth: 1.0
            }}>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text> Projeto: </Text>
                <Text>{this.props.comp.nome}</Text>
              </Body>
            </CardItem>
            <CardItem header>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>Início Previsto: </Text>
                <Text>{this.props.comp.inicioPrevisto}</Text>
              </Body>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>Fim Previsto: </Text>
                <Text>{this.props.comp.fimPrevisto}</Text>
              </Body>
            </CardItem>
            <CardItem style={{
              borderBottomColor: '#c1c1c1',
              borderBottomWidth: 1.0
            }}>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>Situação: </Text>
                {this.renderCorSituacao(this.props.comp.situacao)}
                <Text style={{
                  color: 'black',
                  paddingLeft: 10
                }}>
                  {this.renderSituacao(this.props.comp.situacao)}
                </Text>
              </Body>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>Início real: </Text>
                <Text>{this.props.comp.inicioReal}</Text>
              </Body>
            </CardItem>
            
            <CardItem header>
              <Body>
                <Text>Escopo</Text>
              </Body>
            </CardItem>
            <CardItem style={{
              borderBottomColor: '#c1c1c1',
              borderBottomWidth: 1.0
            }}>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>% previsto: </Text>
                <Text>{this.props.comp.escopoPrevisto}</Text>
              </Body>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>% realizado: </Text>
                <Text>{this.props.comp.escopoReal}</Text>
              </Body>
            </CardItem>
            <CardItem header>
              <Body>
                <Text>Tempo</Text>
              </Body>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-around' }}>
              <Body>
                <Text>Início</Text>
              </Body>
              <Body>
                <Text>Fim</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>Base: </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>Previsto: </Text>
                <Text>{this.props.comp.inicioPrevisto}</Text>
                <Text>{this.props.comp.fimPrevisto}</Text>
              </Body>
            </CardItem>
            <CardItem style={{
              borderBottomColor: '#c1c1c1',
              borderBottomWidth: 1.0
            }}>
              <Body style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text>Real: </Text>
                <Text>{this.props.comp.inicioReal}</Text>
                <Text>{this.props.comp.fimReal}</Text>
              </Body>
            </CardItem>
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
    width: wp('35%'),
    height: hp('40%'),
    resizeMode: 'contain'
  },
});

export default HeaderNB;