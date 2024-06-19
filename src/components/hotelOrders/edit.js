import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Moment from 'moment';
import { BackHandler } from 'react-native';
import RowVertical from './../lib/rowVertical'
import SearchPicker from './../lib/searchPicker'
import { DatePickerInput } from 'react-native-paper-dates';

import { UpdateHotelOrder } from '../../redux/actions/hotelOrders'

class HotelOrderEditFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

      let item = this.props.route.params.item;

      const dateInMask = new Date(Moment(item.dateIN));
      const dateOutMask = new Date(Moment(item.dateOUT));

      this.state = {
        id: item.id,
        total: item.total,
        people: item.people,
        customer: item.customer,
        room: item.room,
        dateIN: item.dateIN,
        dateInMask: dateInMask,
        dateOUT: item.dateOUT,
        dateOutMask: dateOutMask
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            const dateInMask = new Date(Moment(item.dateIN));
            const dateOutMask = new Date(Moment(item.dateOUT));
            this.setState({
                id: item.id,
                total: item.total,
                people: item.people,
                customer: item.customer,
                room: item.room,
                dateIN: item.dateIN,
                dateInMask: dateInMask,
                dateOUT: item.dateOUT,
                dateOutMask: dateOutMask
            })
        }
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
      const { id, total, people, customer, room, dateInMask, dateOutMask, dateIN, dateOUT } = this.state;
      this.props.UpdateHotelOrder(id,this.props.userAuth.id,parseFloat(total),dateInMask,dateOutMask, dateIN, dateOUT,'Efectivo',Number(people),room,customer,this.props.defaultStoreID,()=>{
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
      const { total, customer, room, people, dateInMask, dateOutMask } = this.state;
  
      return (
        <View style={styles.container}>
            <RowVertical name="Escoger Cliente">
                <SearchPicker
                    text="Buscar"
                    items={this.props.customers}
                    onItemSelect={(customer) => this.customerSelect(customer)}
                    defaultIndex={this.props.customers.findIndex(x=> x.id === customer.id).toString()}
                />
            </RowVertical>
            <RowVertical name="Escoger Habitación">
                <SearchPicker
                    text="Buscar"
                    items={this.props.rooms}
                    onItemSelect={(room) => this.roomSelect(room)}
                    defaultIndex={this.props.rooms.findIndex(x=> x.id === room.id).toString()}
                />
            </RowVertical>
            <TextInput
              label="Total"
              value={total.toString()}
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ total: text })}
              style={styles.input}
            />
            <TextInput
              label="Cantidad de personas"
              value={people.toString()}
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
    UpdateHotelOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelOrderEditFormScreen);
