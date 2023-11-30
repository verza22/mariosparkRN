import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { Logout } from '../../redux/actions/appConfig'

class LogoutScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.Logout();
  };

  render() {
    return (
      <View>
      </View>
    );
  }
}


const mapDispatchToProps = {
    Logout
};

export default connect(null, mapDispatchToProps)(withTheme(LogoutScreen));