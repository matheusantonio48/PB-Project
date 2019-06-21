import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Splash from './src/components/splash';
import TelaLogin from './src/components/telaLogin';
import TelaProjetos from './src/components/telaProjetos';
import TelaTarefasResumo from './src/components/telaTarefasResumo';
import TelaRegistros from './src/components/telaRegistros';

export default props => (
  <Router>

    <Scene key="root">

      <Scene key="TelaLogin"
        component={TelaLogin}
        hideNavBar={true} />

      <Scene key="TelaProjetos"
        component={TelaProjetos}
        hideNavBar={true} />

      <Scene key="TelaTarefasResumo"
        component={TelaTarefasResumo}
        hideNavBar={true} />

      <Scene key="TelaRegistros"
        component={TelaRegistros}
        hideNavBar={true} />

      <Scene key="Splash"
        component={Splash}
        hideNavBar={true} />

    </Scene>
  </Router>
);
