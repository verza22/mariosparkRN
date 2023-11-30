import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

class Row extends Component {
    render(){
        return  <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.boldText}>{this.props.name}</Text>
        <Text variant="bodyLarge" style={styles.rightAlignedText}>{this.props.children}</Text>
      </View>
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Alinea los elementos en una fila
      justifyContent: 'space-between', // Distribuye el espacio entre los elementos
      paddingHorizontal: 6, // Ajusta según sea necesario
    },
    boldText: {
      fontWeight: 'bold', // Estilo de texto en negrita
    },
    rightAlignedText: {
      textAlign: 'right', // Alinea el texto a la derecha
    },
  });

export default Row;