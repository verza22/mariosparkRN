
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';
import { Button } from 'react-native-paper';


class App extends React.Component {

  constructor(){
    super();

    this.state = {
      name: 'John Zurita 2'
    }
  }

  render () {
      return (<>
          <Text>Hola {this.state.name}</Text>
          <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
      </>
      )
  }
}


export default App;
