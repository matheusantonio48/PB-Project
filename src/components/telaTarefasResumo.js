import React, { Component } from "react";
import { StyleSheet, Image, View } from 'react-native';
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
        <Header transparent style={{ backgroundColor: 'white' }}>
          <Body>
          </Body>
          <Right>
            <Image style={styles.logoStyle} source={require('../img/logo-internas-pb.png')} />
          </Right>
        </Header>

        <View>
          <Text style={{ textAlign: 'right', paddingRight: wp('5%'), fontWeight: '900' }}>Organização {this.props.org}.</Text>
          <Text style={{ textAlign: 'right', paddingRight: wp('5%') }}>{this.props.user}</Text>
        </View>

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
                <Text style={{fontSize: 10, fontWeight: '900'}}> PROJETO {this.props.proj.nome} / TAREFA {this.props.comp.nome} </Text>
              </Body>
            </CardItem>
            <CardItem style={{ flexDirection: 'row', justifyContent: 'space-around' }} header>
              <View>
                <Text style={{fontSize: 12, textAlign: 'left'}}>Início Previsto: {this.props.comp.inicioPrevisto}</Text>
              </View>
              <View>
                <Text style={{fontSize: 12, textAlign: 'left'}}>Fim Previsto: {this.props.comp.fimPrevisto}</Text>
              </View>
            </CardItem>

            <CardItem style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View>
                <Text style={{fontSize: 12, textAlign: 'left'}}>Situação: {this.renderSituacao(this.props.comp.situacao)}</Text>
                {/*  <View>{this.renderCorSituacao(this.props.comp.situacao)}</View>*/}
              </View>
              <View>
                <Text style={{fontSize: 12, textAlign: 'left'}}>Início real: {this.props.comp.inicioReal}</Text>
              </View>
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
                <Text style={{ paddingLeft: '50%' }}>Início</Text>
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
                <Text style={{ paddingLeft: '5%', paddingRight: '5%' }}>{this.props.comp.inicioPrevisto}</Text>
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
                <Text style={{ paddingLeft: '14%', paddingRight: '5%' }}>{this.props.comp.inicioReal}</Text>
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