import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import { AddPrinter } from '../../redux/actions/printers'

class PrinterAddFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

      this.state = {
        name: '',
        ip: '',
        isPrincipal: false
      };
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('ConfigImpresora');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    save = () => {
      const { name, ip, isPrincipal } = this.state;
      this.props.AddPrinter(name, ip, isPrincipal, this.props.defaultStoreID, ()=>{
        this.props.navigation.navigate('ConfigImpresora');
      });
    };
  
    render() {
      const { name, ip, isPrincipal } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
              label="Nombre"
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
              style={styles.input}
            />
            <TextInput
              label="IP"
              value={ip}
              onChangeText={(text) => this.setState({ ip: text })}
              style={styles.input}
            />
            <View style={styles.containerCb}>
                <Text style={styles.textCb}>Es principal</Text>
                <Checkbox.Item
                    status={isPrincipal === true ? 'checked' : 'unchecked'}
                    onPress={() => this.setState({isPrincipal: isPrincipal === true ? true : false})}
                    style={styles.checkbox}
                />
            </View>
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
              Guardar Impresora
            </Button>
          </ScrollView>
        </View>
      );
    }
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        padding: 16,
    },
    input: {
        marginBottom: 20,
    },
    saveButton: {
        marginBottom: 20,
    },
    containerCb: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10, 
    },
    textCb: {
        flex: 1, 
    },
    checkbox: {
        flex: 1,
    },
});

const mapStateToProps = state => ({
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
    AddPrinter
};

export default connect(mapStateToProps, mapDispatchToProps)(PrinterAddFormScreen);
