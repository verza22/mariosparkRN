
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

import ProductsScreen from './src/components/product/list'


class App extends React.Component {

  constructor(){
    super();

    this.state = {
      name: 'John Zurita 3'
    }
  }

  render () {
      return (<>
          <ProductsScreen/>
      </>
      )
  }
}


export default App;
