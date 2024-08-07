import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import { UpdatePrinter } from '../../redux/actions/printers'

class PrinterEditFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

      let item = this.props.route.params.item;

      this.state = {
        id: item.id,
        name: item.name,
        ip: item.ip,
        isPrincipal: item.isPrincipal,
        messageIni: item.messageIni,
        messageFin: item.messageFin
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            console.log(item)
            this.setState({
                id: item.id,
                name: item.name,
                ip: item.ip,
                isPrincipal: item.isPrincipal,
                messageIni: item.messageIni,
                messageFin: item.messageFin
            });
        }
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
      const { id, name, ip, isPrincipal, messageIni, messageFin } = this.state;
      this.props.UpdatePrinter(id, name, ip, isPrincipal, messageIni, messageFin, this.props.defaultStoreID, ()=>{
        this.props.navigation.navigate('ConfigImpresora');
      });
    };
  
    render() {
      const { name, ip, isPrincipal, messageIni, messageFin } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.containerCb}>
              <Text style={styles.textCb}>Es principal</Text>
              <Checkbox.Item
                  status={isPrincipal === true ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({isPrincipal: isPrincipal === true ? false : true})}
                  style={styles.checkbox}
              />
            </View>
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
            <TextInput
              label="Mensaje inicio"
              value={messageIni}
              onChangeText={(text) => this.setState({ messageIni: text })}
              multiline={true}
              mode="outlined"
              style={styles.textArea}
            />
            <TextInput
              label="Mensaje Fin"
              value={messageFin}
              onChangeText={(text) => this.setState({ messageFin: text })}
              multiline={true}
              mode="outlined"
              style={styles.textArea}
            />
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
    textArea: {
      height: 120,
      marginBottom: 16,
    },
});

const mapStateToProps = state => ({
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
    UpdatePrinter
};

export default connect(mapStateToProps, mapDispatchToProps)(PrinterEditFormScreen);
