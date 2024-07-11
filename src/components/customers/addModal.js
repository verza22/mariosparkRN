import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, TextInput } from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import { AddCustomer } from '../../redux/actions/customer'

class AddModal extends Component {
    constructor(props) {
      super(props);

      this.colors = props.theme.colors;

      this.open = this.open.bind(this);
      this.save = this.save.bind(this);
      this.close = this.close.bind(this);

      this.state = {
        isModalVisible: false,
        name: '',
        dni: '',
        email: '',
        phone: '',
        address: ''
      };
    }

    componentDidMount(){
        if(this.props.innerRef)
            this.props.innerRef.current = this;
    }

    open(){
        this.setState({isModalVisible: true})
    }

    close(){
        this.setState({
            isModalVisible: false,
            name: '',
            dni: '',
            email: '',
            phone: '',
            address: ''
        })
    }
  
    save() {
      const { name, dni, email, phone, address } = this.state;
      this.props.AddCustomer(name, dni, email, phone, address, this.props.defaultStoreID, ()=>{
        this.close();
      });
    };
  
    render() {
      const { name, dni, email, phone, address } = this.state;
  
      return (
        <Modal
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nuevo Cliente</Text>
            <TextInput
              placeholder="Nombre"
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="DNI"
              value={dni}
              onChangeText={(text) => this.setState({ dni: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Teléfono"
              value={phone}
              onChangeText={(text) => this.setState({ phone: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Dirección"
              value={address}
              onChangeText={(text) => this.setState({ address: text })}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.okButton, { backgroundColor: this.colors.primary }]} onPress={this.save}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={this.close}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
  }
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
      },
      cancelButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
      },
      cancelButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      okButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
      },
      okButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

const mapStateToProps = state => ({
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
    AddCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AddModal));
