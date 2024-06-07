import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import CustomPicker from '../lib/customPicker'

import { UpdateHotelRoom } from '../../redux/actions/hotelRoom'

class HotelRoomEditFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      let item = this.props.route.params.item;

      console.log(item)
      console.log(this.props.hotelRoomTypes)

      this.state = {
        id: item.id,
        name: item.name,
        capacity: item.capacity.toString(),
        type: item.type
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            this.setState({
                id: item.id,
                name: item.name,
                capacity: item.capacity.toString(),
                type: item.type
            })
        }
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('HotelRooms');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    save = () => {
      const { id, name, capacity, type } = this.state;
      this.props.UpdateHotelRoom(id, name, capacity, type);
      this.props.navigation.navigate('HotelRooms');
    };
  
    render() {
      const { name, capacity, type } = this.state;
  
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
              label="Capacidad"
              keyboardType='numeric'
              value={capacity}
              onChangeText={(text) => this.setState({ capacity: text })}
              style={styles.input}
            />
            <CustomPicker
                label="Selecciona un tipo"
                value={type}
                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                items={this.props.hotelRoomTypes}
                cLabel='name'
                cValue='id'
            />
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
              Actualizar Habitación
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
    hotelRoomTypes: state.appConfigReducer.hotelRoomTypes,
});

const mapDispatchToProps = {
    UpdateHotelRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelRoomEditFormScreen);
