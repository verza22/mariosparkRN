import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import CustomPicker from '../lib/customPicker'

import { UpdateUser } from '../../redux/actions/users'

class UserEditFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      let item = this.props.route.params.item;

      this.state = {
        id: item.id,
        username: item.username,
        name: item.name,
        type: item.type,
        password: ''
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            this.setState({
                id: item.id,
                username: item.username,
                name: item.name,
                type: item.type,
                password: ''
            })
        }
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
      const { id, username, name, password, type } = this.state;
      this.props.UpdateUser(id, username, name, password, type, this.props.defaultStoreID, ()=>{
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
                items={this.props.userTypeList}
                cLabel='name'
                cValue='id'
            />
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
              Actualizar Usuario
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
  defaultStoreID: state.appConfigReducer.defaultStoreID,
  userTypeList: state.appConfigReducer.userTypeList
});

const mapDispatchToProps = {
    UpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditFormScreen);
