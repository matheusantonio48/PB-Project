import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';


import {
  StyleSheet,
  View,
  Image,
  ImageBackground


} from 'react-native';



export default class splash extends Component {

  async componentDidMount() {
    let PBToken = await AsyncStorage.getItem('@ProjectBuilder:token');
    setTimeout(function(){
      if (PBToken != null ){
        Actions.TelaLogin();
      } else {
          Actions.TelaLogin();
      }
    }, 2500);
 
 

   }


  render() {
    return (
      <ImageBackground source={require("../img/Layout-APP-PB-tela-01.png")} style={styles.principal}>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  principal: {
    width: wp('100%'),
    height: hp('100%'),
    flex: 1
  },

});