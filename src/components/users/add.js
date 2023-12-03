import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import CustomPicker from '../lib/customPicker'

import { AddUser } from '../../redux/actions/users'
import { userType } from './../../data'

class UserFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

      this.typeList = props.authUser.type === userType.ADMIN ? [
        {
            id: userType.ADMIN,
            name: 'Admin'
        },
        {
            id: userType.CASHIER,
            name: 'Cajero'
        },
        {
            id: userType.WAITER,
            name: 'Mesero'
        },
        {
            id: userType.CHEF,
            name: 'Cocinero'
        },
      ] : [
        {
            id: userType.WAITER,
            name: 'Mesero'
        }
      ]

      this.state = {
        username: '',
        name: '',
        type: '',
        password: ''
      };
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('Users');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    save = () => {
      const { username, name, password, type } = this.state;
      this.props.AddUser(username, name, password, type);
      this.props.navigation.navigate('Users');
    };
  
    render() {
      const { username, name, password, type } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
          <TextInput
              label="Usuario"
              value={username}
              onChangeText={(text) => this.setState({ username: text })}
              style={styles.input}
            />
            <TextInput
              label="Nombre"
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
              style={styles.input}
              secureTextEntry={true}
            />
            <CustomPicker
                label="Tipo"
                value={type}
                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                items={this.typeList}
                cLabel='name'
                cValue='id'
            />
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
              Guardar Usuario
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

const mapStateToProps = state => ({
  authUser: state.appConfigReducer.user
});

const mapDispatchToProps = {
    AddUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFormScreen);
