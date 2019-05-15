import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Drawer, Container, Header, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import SideBar from './sideBar';

export default class header extends Component {
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.navigator} />}
                onClose={() => this.closeDrawer()}>
                <Container>
                    <Header>
                        <Container style={{ flexDirection: 'row' }}>
                            <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="#fff" />
                        </Container>
                    </Header>

                    <View style={styles.container}>
                        <Text style={styles.welcome}>
                            Welcome to React Native!
                        </Text>

                        <Text style={styles.instructions}>
                            To get started, edit App.js
                        </Text>
                    </View>

                </Container>
            </Drawer>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});