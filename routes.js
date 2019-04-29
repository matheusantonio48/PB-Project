import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Splash from './src/components/splash';
import TelaLogin from './src/components/telaLogin';

export default props => (
  <Router>

    <Scene key="root">
    
    <Scene key="TelaLogin"
        component={TelaLogin}
        hideNavBar={true} />

    <Scene key="Splash"
        component={Splash}
        hideNavBar={true} />

    </Scene>
  </Router>
);
