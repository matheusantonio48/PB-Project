import React, {Component} from 'react';
import{
  StyleSheet,
  View
}
from 'react-native';
import RoutesScrn from "./routes";
export default class App extends Component {

  render(){
    return(

      <View style={styles.container}>
      <RoutesScrn />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});
//appRegistry.registerComponent('App', () => App );