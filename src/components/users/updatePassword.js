import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';

import { UpdateUserPassword } from '../../redux/actions/appConfig'

class UpdatePasswordFormScreen extends Component {
    constructor(props) {
      super(props);

      this.state = {
        password: ''
      };
    }

    save = () => {
      const { password } = this.state;
      this.props.UpdateUserPassword(this.props.userID, password, ()=>{
        this.setState({password: ''})
        Alert.alert(
            "Contraseña",
            "Contraseña actualiza correctamente",
            [
              { text: 'OK', onPress: () => {} }
            ],
            { cancelable: false }
          );
      });
    };
  
    render() {
      const { password } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
              style={styles.input}
              secureTextEntry={true}
            />
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
              Actualizar Password
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
});

const mapStateToProps = state => ({
  userID: state.appConfigReducer.user.id
});

const mapDispatchToProps = {
    UpdateUserPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordFormScreen);
