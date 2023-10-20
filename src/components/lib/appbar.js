import React, { Component  } from 'react';
import { StyleSheet } from 'react-native';
import {  Appbar } from 'react-native-paper';
import { Text } from 'react-native';
import { withTheme } from 'react-native-paper';


class App extends Component {
    constructor(props) {
      super(props);
      this.colors = props.theme.colors;
    }
  
    render() {
      return (
        <Appbar.Header
        style={{
            backgroundColor: this.colors.primary, 
        }}
        >
        <Appbar.Content
        title={
          <Text style={{ color: 'white', fontSize: 18 }}>{this.props.name}</Text> // Cambia el color del texto a rojo
        }
      />
        </Appbar.Header>
      );
    }
  }

const styles = StyleSheet.create({
});

export default withTheme(App);
