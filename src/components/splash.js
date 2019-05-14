import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';



import {
  StyleSheet,
  View,
  Image,


} from 'react-native';



export default class splash extends Component {

  render() {
    return (
      <View style={styles.principal}>
        <View style={styles.splashLogo}>
          <Image style={styles.logoStyle} source={require('../img/logo-e-titulo-splash-pb.png')} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  principal: {
    flex: 1
  },

  splashLogo: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90%'),
    height: hp('40%'),
    resizeMode: 'contain'

  }

});