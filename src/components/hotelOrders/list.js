import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert  } from 'react-native';
import { List,  Portal, Modal, FAB, withTheme, Button } from 'react-native-paper';
import { connect } from 'react-redux';

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
      this.props.GetHotelOrders(this.props.token, this.props.defaultStoreID);

      if(this.props.customers.length === 0)
        this.props.GetCustomers(this.props.token, this.props.defaultStoreID);

      if(this.props.rooms.length === 0)
        this.props.GetHotelRooms(this.props.token, this.props.defaultStoreID);
    }

    handlePress(item){
      this.props.navigation.navigate('EditHotelOrder', { item });
    };

    onLongPress(item){
      this.setState({ modalVisible: true, orderID: item.id });
    };

    handleDelete = () => {
      this.props.RemoveHotelOrder(this.state.orderID);
      this.setState({ modalVisible: false, orderID: null });
      Alert.alert('Orden eliminada');
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
                <Text style={styles.category}>IN: {item.dateIn}</Text>
                <Text style={styles.category}>OUT: {item.dateOut}</Text>
            </>
        }
        right={() => 
            <>
                <Text style={styles.category2}>Habitacion: {item.room.name} {"\n"} {this.getHotelRoomTypeName(item.room.type)}</Text>
            </>
        }
        style={styles.item}
      />
    );

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
    token: state.appConfigReducer.token,
    defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
    RemoveHotelOrder,
    GetHotelOrders,
    GetCustomers,
    GetHotelRooms
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HotelOrderListScreen));