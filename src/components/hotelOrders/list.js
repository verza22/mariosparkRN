import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert  } from 'react-native';
import { List,  Portal, Modal, FAB, withTheme, Button, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { NetPrinter } from "choiceqr-react-native-thermal-printer";
import { adjustText } from './../lib/util';
import Moment from 'moment';

import { RemoveHotelOrder, GetHotelOrders } from '../../redux/actions/hotelOrders'
import { GetCustomers } from '../../redux/actions/customer'
import { GetHotelRooms } from '../../redux/actions/hotelRoom'

class HotelOrderListScreen extends Component {
    constructor(props) {
      super(props);
      this.onPressFab = this.onPressFab.bind(this);
      this.colors = props.theme.colors;
      this.state = {
        modalVisible: false,
        orderID: null
      };
    }

    componentDidMount(){
      this.props.GetHotelOrders(this.props.defaultStoreID);

      if(this.props.customers.length === 0)
        this.props.GetCustomers(this.props.defaultStoreID);

      if(this.props.rooms.length === 0)
        this.props.GetHotelRooms(this.props.defaultStoreID);
    }

    handlePress(item){
      this.props.navigation.navigate('EditHotelOrder', { item });
    };

    onLongPress(item){
      this.setState({ modalVisible: true, orderID: item.id });
    };

    handleDelete = () => {
      this.setState({ modalVisible: false, orderID: null });
      this.props.RemoveHotelOrder(this.state.orderID, ()=>{
        Alert.alert('Orden eliminada');
      });
    };

    getHotelRoomTypeName(id){
      let i = this.props.hotelRoomTypes.findIndex(x=> x.id === id);
      return i>=0 ? this.props.hotelRoomTypes[i].name : "";
    }
  
    renderOrders = ({ item }) => (
      <List.Item
        onPress={() => this.handlePress(item)}
        onLongPress={() => this.onLongPress(item)}
        title={'Hospedaje '+item.id}
        description={() => 
            <>
                <Text style={styles.category}>Cliente: {item.customer.name}</Text>
                <Text style={styles.category}>Total: {item.total}</Text>
                <Text style={styles.category}>IN: {item.dateIN}</Text>
                <Text style={styles.category}>OUT: {item.dateOUT}</Text>
            </>
        }
        right={() => 
          <View style={{ flexDirection: 'col', alignItems: 'flex-end', padding: 0, margin: 0 }}>
            <Text style={styles.category2}>Habitacion: {item.room.name} {"\n"} {this.getHotelRoomTypeName(item.room.type)}</Text> 
            <IconButton
              icon="printer"
              size={20}
              style={{ padding: 0, margin: 0 }}
              onPress={() => this.printer(item)}
            />
          </View>
        }
        style={styles.item}
      />
    );

    printer(item){
      //print

      let { total, cantBabies, cantChildren, cantAdult, dateInMask, dateOutMask } = item;

      cantBabies = cantBabies === null ? 0 : Number(cantBabies);
      cantChildren = cantChildren === null ? 0 : Number(cantChildren);
      cantAdult = cantAdult === null ? 0 : Number(cantAdult);

      const days = this.getNumberDays(dateInMask, dateOutMask);

      this.props.printers.forEach(x=> {
        let ip = x.ip;
        let messageIni = x.messageIni;
        let messageFin = x.messageFin;
        if(x.isPrincipal){
          NetPrinter.init().then(() => {
          // this.setState({ printers: [{ host: ip, port: 9100 }] })
            NetPrinter.connectPrinter(ip, 9100)
            .then((printer) => {
            // this.setState({ currentPrinter: printer });
              //48caracteres de ancho
              let message = '';
              
message += `${messageIni}\n
<C>ORDEN HOSPEDAJE #${item.id}</C>
------------------------------------------------
${adjustText('Descripcion', 20, false)}${adjustText('Cant. Dias', 10, true)}${adjustText('P.Uni', 9, true)}${adjustText('P.Tot', 9, true)}
------------------------------------------------`;
                
if(cantBabies > 0)
  message += adjustText(cantBabies+" "+(cantBabies === 1 ? "Bebe" : "Bebes"), 20, false)+adjustText(days.toString(), 10, true)+adjustText((item.room.priceBabies).toFixed(2), 9, true)+adjustText((days * cantBabies * item.room.priceBabies).toFixed(2), 9, true);
if(cantChildren > 0)
  message += adjustText(cantChildren+" "+(cantChildren === 1 ? "Nino" : "Ninos"), 20, false)+adjustText(days.toString(), 10, true)+adjustText((item.room.priceChildren).toFixed(2), 9, true)+adjustText((days * cantChildren * item.room.priceChildren).toFixed(2), 9, true);
if(cantAdult > 0)
  message += adjustText(cantAdult+" "+(cantAdult === 1 ? "Adulto" : "Adultos"), 20, false)+adjustText(days.toString(), 10, true)+adjustText((item.room.priceAdults).toFixed(2), 9, true)+adjustText((days * cantAdult * item.room.priceAdults).toFixed(2), 9, true);
                
message += `\n
------------------------------------------------
${adjustText('TOTAL:', 36, true)}${adjustText(total.toFixed(2), 12, true)}
------------------------------------------------
FECHA ENTRADA: ${Moment(dateInMask).format('DD/MM/YYYY')}
FECHA SALIDA:  ${Moment(dateOutMask).format('DD/MM/YYYY')}
------------------------------------------------
CLIENTE: ${adjustText(item.customer.name, 39, false)}
CED/RUC: ${adjustText(item.customer.dni, 39, false)}
------------------------------------------------
${messageFin}
\n\n`;
              NetPrinter.printText(message);
            });
          });
        }
      });
    }

    getNumberDays(dateInMask, dateOutMask){
      const fecha1 = Moment(dateInMask);
      const fecha2 = Moment(dateOutMask);

      return fecha2.diff(fecha1, 'days');
    }

    onPressFab() {
      this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'AddHotelOrder' }]
    })
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Portal>
            <Modal 
              visible={this.state.modalVisible} 
              onDismiss={() => this.setState({ modalVisible: false })}
              contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
            >
              <View style={{ margin: 20 }}>
                <Text>¿Estás seguro de que deseas eliminar esta orden?</Text>
                <Button mode="contained" onPress={this.handleDelete} style={{ marginTop: 10 }}>
                  Confirmar Eliminación
                </Button>
              </View>
            </Modal>
          </Portal>
          <FlatList
            data={this.props.hotelOrders}
            renderItem={this.renderOrders}
            keyExtractor={item => item.id.toString()}
          />
           <FAB
            style={{ ...styles.fab, backgroundColor: this.colors.primary }}
            icon="plus"
            color="white"
            onPress={this.onPressFab}
        />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 30,
  },
  item: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 8,
  },
  foodItemImage: {
    width: '100%',
    height: '100%',
  },
  categoryButton: {
    padding: 8,
    marginBottom: 15
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  category: {
    fontWeight: 'bold',
  },
  category2: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
});


const mapStateToProps = state => ({
    hotelOrders: state.hotelOrderReducer.hotelOrders,
    customers: state.customerReducer.customers,
    rooms: state.hotelRoomReducer.hotelRooms,
    hotelRoomTypes: state.appConfigReducer.hotelRoomTypes,
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    printers: state.printerReducer.printers
});

const mapDispatchToProps = {
    RemoveHotelOrder,
    GetHotelOrders,
    GetCustomers,
    GetHotelRooms
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HotelOrderListScreen));