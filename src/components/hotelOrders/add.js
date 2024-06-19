import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Moment from 'moment';
import { BackHandler } from 'react-native';
import RowVertical from './../lib/rowVertical'
import SearchPicker from './../lib/searchPicker'
import { DatePickerInput } from 'react-native-paper-dates';

import { AddHotelOrder } from '../../redux/actions/hotelOrders'

class HotelOrderFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

      this.state = {
        total: null,
        people: null,
        customer: null,
        room: null,
        dateIN: null,
        dateInMask: null,
        dateOUT: null,
        dateOutMask: null
      };
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('HotelOrders');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    save = () => {
      const { total, people, customer, room, dateInMask, dateOutMask, dateIN, dateOUT } = this.state;
      this.props.AddHotelOrder(this.props.userAuth.id,parseFloat(total),dateInMask,dateOutMask, dateIN, dateOUT,'Efectivo',Number(people),room,customer,this.props.defaultStoreID,()=>{
        this.props.navigation.navigate('HotelOrders');
      });
    };

    customerSelect(customer){
        this.setState({customer: {
            id: customer.id,
            dni: customer.dni,
            name: customer.name, 
            email: customer.email, 
            phone: customer.phone, 
            address: customer.address
          }})
    }

    roomSelect(room){
        this.setState({room: {
            id: room.id,
            name: room.name, 
            type: room.type,
            capacity: room.capacity
          }})
    }

    setDate(date, property, property2){
        let aux = Moment(date).format('YYYY-MM-DD HH:mm:ss');
        this.setState({[property2]: date, [property]: aux})
    }
  
    render() {
      const { total, people, dateInMask, dateOutMask } = this.state;
  
      return (
        <View style={styles.container}>
            <RowVertical name="Escoger Cliente">
                <SearchPicker
                    text="Buscar"
                    items={this.props.customers}
                    onItemSelect={(customer) => this.customerSelect(customer)}
                />
            </RowVertical>
            <RowVertical name="Escoger Habitación">
                <SearchPicker
                    text="Buscar"
                    items={this.props.rooms}
                    onItemSelect={(room) => this.roomSelect(room)}
                />
            </RowVertical>
            <TextInput
              label="Total"
              value={total}
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ total: text })}
              style={styles.input}
            />
            <TextInput
              label="Cantidad de personas"
              value={people}
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ people: text })}
              style={styles.input}
            />
            <View style={styles.containerDate}>
                <DatePickerInput
                    locale="en"
                    label="Fecha de Ingreso"
                    value={dateInMask}
                    onChange={(text) => this.setDate(text, 'dateIN', 'dateInMask')}
                />
            </View>
            <View style={styles.containerDate}>
                <DatePickerInput
                    locale="en"
                    label="Fecha de Salida"
                    value={dateOutMask}
                    onChange={(text) => this.setDate(text, 'dateOUT', 'dateOutMask')}
                />
            </View>
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
            Guardar Orden
            </Button>
        </View>
      );
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12
  },
  containerDate:{
    marginTop: 20,
    marginBottom: 50,
  },
  input: {
    marginBottom: 15,
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
    customers: state.customerReducer.customers,
    userAuth: state.appConfigReducer.user,
    rooms: state.hotelRoomReducer.hotelRooms
});

const mapDispatchToProps = {
    AddHotelOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelOrderFormScreen);
