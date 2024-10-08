import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import CryptoJS from "rn-crypto-js";
import messaging from '@react-native-firebase/messaging';

import { Login, UpdateUserToken } from '../../redux/actions/appConfig'
import { DataFailure } from '../../redux/actions/dataRequest'

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

    this.props.Login(this.state.username, password, (userID)=> {
      messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.props.UpdateUserToken(userID, fcmToken);
        } else {
          this.props.DataFailure('Failed to get the token.');
        }
      });
    });
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
    Login,
    DataFailure,
    UpdateUserToken
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LoginScreen));