import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

class RowVertical extends Component {
    render(){
        return <View style={styles.container} {...this.props}>
        <Text variant="bodyLarge" style={styles.boldText}>{this.props.name}</Text>
        <View>{this.props.children}</View>
      </View>
    }
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 12
    },
    boldText: {
      fontWeight: 'bold', 
      marginBottom: 6
    },
  });

export default RowVertical;