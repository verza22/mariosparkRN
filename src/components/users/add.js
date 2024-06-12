import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import CustomPicker from '../lib/customPicker'

import { AddUser } from '../../redux/actions/users'

class UserFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

      this.typeList = props.authUser.type === this.props.userType["ADMIN"] ? this.props.userTypeList : this.props.userTypeList.filter(x=> x.name === "WAITER")

      this.state = {
        username: '',
        name: '',
        type: this.props.userType["ADMIN"],
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
      this.props.AddUser(this.props.token, username, name, password, type, this.props.defaultStoreID, ()=>{
        this.props.navigation.navigate('Users');
      });
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
  token: state.appConfigReducer.token,
  defaultStoreID: state.appConfigReducer.defaultStoreID,
  authUser: state.appConfigReducer.user,
  userTypeList: state.appConfigReducer.userTypeList,
  userType: state.appConfigReducer.userType
});

const mapDispatchToProps = {
    AddUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFormScreen);
