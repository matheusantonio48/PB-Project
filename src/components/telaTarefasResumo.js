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
    FooterTab
} from "native-base";


class HeaderNB extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                <Content padder />
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
                            <Icon  style={{ color: '#dcdcdc' }} active={this.state.tab4} name="cog" />
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