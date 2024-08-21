import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { TextInput, Button, IconButton, Portal, Modal  } from 'react-native-paper';
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
      this.handleCant = this.handleCant.bind(this);

      let item = this.props.route.params.item;

      const dateInMask = new Date(Moment(item.dateIN));
      const dateOutMask = new Date(Moment(item.dateOUT));

      this.state = {
        id: item.id,
        total: item.total,
        cantBabies: item.cantBabies,
        cantChildren: item.cantChildren,
        cantAdult: item.cantAdult,
        customer: item.customer,
        room: item.room,
        dateIN: item.dateIN,
        dateInMask: dateInMask,
        dateOUT: item.dateOUT,
        dateOutMask: dateOutMask,
        modalVisible: false
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
                cantBabies: item.cantBabies,
                cantChildren: item.cantChildren,
                cantAdult: item.cantAdult,
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
      let { id, total, cantBabies, cantChildren, cantAdult, customer, room, dateInMask, dateOutMask, dateIN, dateOUT } = this.state;

      cantBabies = cantBabies === null ? 0 : Number(cantBabies);
      cantChildren = cantChildren === null ? 0 : Number(cantChildren);
      cantAdult = cantAdult === null ? 0 : Number(cantAdult);

      let people = cantBabies + cantChildren + cantAdult;

      this.props.UpdateHotelOrder(id,this.props.userAuth.id,parseFloat(total),cantBabies,cantChildren,cantAdult,dateInMask,dateOutMask, dateIN, dateOUT,'Efectivo',Number(people),room,customer,this.props.defaultStoreID,()=>{
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
      this.setState({room});
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
      const { total, cantBabies, cantChildren, cantAdult, customer, room, dateInMask, dateOutMask } = this.state;
      const days = this.getNumberDays();
  
      return (
        <View style={styles.container}>
          {
            ((cantBabies!==null && cantBabies>0) || (cantChildren!==null && cantChildren>0) || (cantAdult!==null && cantAdult>0)) &&
              <Text>Dias*Cantidad*Precio = Total</Text>
          }
          {
            (cantBabies!==null && cantBabies>0) &&
              <Text>Total bebes: {days}*{this.state.cantBabies}*{this.state.room.priceBabies} = {days * this.state.cantBabies * this.state.room.priceBabies}</Text>
          }
          {
            (cantChildren!==null && cantChildren>0) &&
              <Text>Total niños: {days}*{this.state.cantChildren}*{this.state.room.priceChildren} = {days * this.state.cantChildren * this.state.room.priceChildren}</Text>
          }
          {
            (cantAdult!==null && cantAdult>0) &&
              <Text>Total adultos: {days}*{this.state.cantAdult}*{this.state.room.priceAdults} = {days * this.state.cantAdult * this.state.room.priceAdults}</Text>
          }
          <Portal>
              <Modal 
                visible={this.state.modalVisible} 
                onDismiss={() => this.setState({ modalVisible: false })}
                contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
              >
                <View style={{ margin: 20 }}>
                  <Image source={{ uri: this.state.room !== null ? this.state.room.image : "" }} style={styles.previewImage} />
                  <Text>{this.state.room?.description}</Text>
                  <Button mode="contained" onPress={() => this.setState({ modalVisible: false })} style={{ marginTop: 10 }}>
                    Cerrar
                  </Button>
                </View>
              </Modal>
          </Portal>
          <Text>Total: {total}</Text>
            <RowVertical name="Escoger Cliente">
                <SearchPicker
                    text="Buscar"
                    items={this.props.customers}
                    onItemSelect={(customer) => this.customerSelect(customer)}
                    defaultIndex={this.props.customers.findIndex(x=> x.id === customer.id).toString()}
                />
            </RowVertical>
            <View style={styles.containerSearchRoom}>
              <View style={styles.viewSearchRoom}>
                <RowVertical name="Escoger Habitación">
                    <SearchPicker
                      text="Buscar"
                      items={this.props.rooms}
                      onItemSelect={(room) => this.roomSelect(room)}
                      defaultIndex={this.props.rooms.findIndex(x=> x.id === room.id).toString()}
                    />
                </RowVertical>
              </View>
              {
                this.state.room !== null &&
                <Button
                  style={styles.btnModal}
                  mode="contained"
                  onPress={() => this.setState({ modalVisible: true })}
                  icon={() => (
                      <IconButton
                        style={styles.btnIconModal}
                        icon="image"
                        size={24}
                        iconColor="white"
                      />
                  )}
                  ></Button>
              }
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
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
                  value={cantBabies.toString()}
                  keyboardType='numeric'
                  onChangeText={(n) => this.handleCant('cantBabies', n)}
                  style={styles.input}
                />
                <TextInput
                  label="Cantidad de niños"
                  value={cantChildren.toString()}
                  keyboardType='numeric'
                  onChangeText={(n) => this.handleCant('cantChildren', n)}
                  style={styles.input}
                />
                <TextInput
                  label="Cantidad de adultos"
                  value={cantAdult.toString()}
                  keyboardType='numeric'
                  onChangeText={(n) => this.handleCant('cantAdult', n)}
                  style={styles.input}
                />
              </>
            }
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
            Guardar Orden
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
    padding: 12,
  },
  contentContainer: {
    
  },
  containerDate1: {
    marginTop: 0,
    marginBottom: 0,
  },
  containerDate:{
    marginTop: 15,
    marginBottom: 20,
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
  containerSearchRoom: {
    flexDirection: 'row',
  },
  viewSearchRoom: {
    flex: 1
  },
  btnModal: {
    height: 48,
    width: 48,
    marginLeft: 20,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  btnIconModal: {
    marginLeft: 20
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  }
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
