import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';
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
      this.handleCant = this.handleCant.bind(this);

      this.state = {
        total: null,
        cantBabies: null,
        cantChildren: null,
        cantAdult: null,
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
      let { total, cantBabies, cantChildren, cantAdult, customer, room, dateInMask, dateOutMask, dateIN, dateOUT } = this.state;

      cantBabies = cantBabies === null ? 0 : Number(cantBabies);
      cantChildren = cantChildren === null ? 0 : Number(cantChildren);
      cantAdult = cantAdult === null ? 0 : Number(cantAdult);

      let people = cantBabies + cantChildren + cantAdult;

      this.props.AddHotelOrder(this.props.userAuth.id,parseFloat(total),cantBabies,cantChildren,cantAdult,dateInMask,dateOutMask, dateIN, dateOUT,'Efectivo',people,room,customer,this.props.defaultStoreID,()=>{
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
      this.setState({room})
    }

    setDate(date, property, property2){
        let aux = Moment(date).format('YYYY-MM-DD HH:mm:ss');
        this.setState({[property2]: date, [property]: aux}, () => {
          this.setTotal();
        });
    }

    getNumberDays(){
      const fecha1 = Moment(this.state.dateInMask);
      const fecha2 = Moment(this.state.dateOutMask);

      return fecha2.diff(fecha1, 'days');
    }

    handleCant(property, n){
      n = Number(n);
      this.setState({[property]: n}, () => {
        this.setTotal();
      });
    }

    setTotal(){
      let days = this.getNumberDays();

      let total = 0;

      if(this.state.cantBabies !== null)
        total += days * this.state.cantBabies * this.state.room.priceBabies;
      if(this.state.cantChildren !== null)
        total += days * this.state.cantChildren * this.state.room.priceChildren;
      if(this.state.cantAdult !== null)
        total += days * this.state.cantAdult * this.state.room.priceAdults;

      this.setState({total});
    }
  
    render() {
      const { total, cantBabies, cantChildren, cantAdult, dateInMask, dateOutMask } = this.state;
  
      return (
        <View style={styles.container}>
            <Text>Total: {total}</Text>
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
            <View style={styles.containerDate1}>
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
            {
              (this.state.room !== null && dateInMask !== null && dateOutMask !== null) && 
              <>
                <TextInput
                  label="Cantidad de bebes"
                  value={cantBabies}
                  keyboardType='numeric'
                  onChangeText={(n) => this.handleCant('cantBabies', n)}
                  style={styles.input}
                />
                <TextInput
                  label="Cantidad de niños"
                  value={cantChildren}
                  keyboardType='numeric'
                  onChangeText={(n) => this.handleCant('cantChildren', n)}
                  style={styles.input}
                />
                <TextInput
                  label="Cantidad de adultos"
                  value={cantAdult}
                  keyboardType='numeric'
                  onChangeText={(n) => this.handleCant('cantAdult', n)}
                  style={styles.input}
                />
              </>
            }
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
  containerDate1: {
    marginTop: 30,
    marginBottom: 50,
  },
  containerDate:{
    marginTop: 20,
    marginBottom: 40,
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
