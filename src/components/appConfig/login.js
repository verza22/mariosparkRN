import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import CryptoJS from "rn-crypto-js";

import { Login } from '../../redux/actions/appConfig'
import { userType } from './../../data'

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin() {
    let password = this.state.password;

    if(password !== ""){
        password = CryptoJS.SHA1(password).toString();
    }

    this.props.Login(this.state.username, password);
    // let i = this.props.users.findIndex(x=> x.type !== userType.WAITER && x.username === this.state.username && x.password === password);
    // if(i>=0){
    //     this.props.Login(this.props.users[i]);
    // }else{
    //     Alert.alert('Usuario o contraseña incorrectos.');
    // }
  };

  render() {
    return (
      <View style={styles.container}>
          <TextInput
            style={styles.input}
            label="Username"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
          />
          <TextInput
            style={styles.input}
            label="Password"
            value={this.state.password}
            secureTextEntry
            onChangeText={(text) => this.setState({ password: text })}
          />
          <Button mode="contained"  onPress={this.handleLogin}>
            Login
            </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  input: {
    marginBottom: 16,
  },
});


const mapStateToProps = state => ({
    users: state.usersReducer.users
});

const mapDispatchToProps = {
    Login
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LoginScreen));