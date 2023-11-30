import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import { UpdateCustomer } from '../../redux/actions/customer'

class CustomerEditFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      let item = this.props.route.params.item;

      this.state = {
        id: item.id,
        name: item.name,
        dni: item.dni,
        email: item.email,
        phone: item.phone,
        address: item.address
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            this.setState({
                id: item.id,
                name: item.name,
                dni: item.dni,
                email: item.email,
                phone: item.phone,
                address: item.address
            })
        }
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('Customers');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    save = () => {
      const { id, name, dni, email, phone, address } = this.state;
      this.props.UpdateCustomer(id, name, dni, email, phone, address);
      this.props.navigation.navigate('Customers');
    };
  
    render() {
      const { name, dni, email, phone, address } = this.state;
  
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
              label="DNI"
              value={dni}
              onChangeText={(text) => this.setState({ dni: text })}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
              style={styles.input}
            />
            <TextInput
              label="Teléfono"
              value={phone}
              onChangeText={(text) => this.setState({ phone: text })}
              style={styles.input}
            />
            <TextInput
              label="Dirección"
              value={address}
              onChangeText={(text) => this.setState({ address: text })}
              style={styles.input}
            />
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
              Actualizar Cliente
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
  imageButton: {
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  saveButton: {
    marginBottom: 20,
  },
});


const mapDispatchToProps = {
    UpdateCustomer
};

export default connect(null, mapDispatchToProps)(CustomerEditFormScreen);
