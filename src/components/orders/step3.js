import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { TextInput, withTheme, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import moment from 'moment';

import RowVertical from './../lib/rowVertical'
import SearchPicker from './../lib/searchPicker'

import { AddOrder } from '../../redux/actions/orders'

class OrderStep3Screen extends Component {
    constructor(props) {
      super(props);

      this.colors = props.theme.colors;

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      this.waiterSelect = this.waiterSelect.bind(this);
      this.customerSelect = this.customerSelect.bind(this);
      this.onPressFab = this.onPressFab.bind(this);

      let products = this.props.route.params.products;

      this.state = {
        products: products,
        waiterID: null,
        customer: null,
        tableNumber: null
      };
    }
    
    getTotal(products){
      let total = 0;
      products.forEach(p=>{
        total +=  p.price * p.quantity;
      });
      return total;
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.products !== prevProps.route.params.products) {
            let products = this.props.route.params.products;
            this.setState({
                products: products
            })
        }
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('OrderStep2');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    waiterSelect(user){
        this.setState({waiterID: user.id})
    }

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

    onPressFab(){
        let date = moment().format();
        let total = this.getTotal(this.state.products);

        let order = {
          cashierID: this.props.userAuth.id,
          waiterID: this.state.waiterID,
          chefID: 0,
          total: total,
          date: date,
          paymentMethod: "Efectivo",
          orderStatus: this.props.orderStatus["PENDIENTE"],
          customer: this.state.customer,
          products: this.state.products,
          tableNumber: Number(this.state.tableNumber)
        };

        this.props.AddOrder({
          ...order,
          token: this.props.token,
          storeID: this.props.defaultStoreID,
          callback: () => {
            this.props.navigation.navigate('Orders');
          }
        });
    }
  
    render() {
  
      return (
        <View style={styles.container}>
            <RowVertical name="Escoger Cliente">
                <SearchPicker
                    text="Buscar"
                    items={this.props.customers}
                    onItemSelect={(customer) => this.customerSelect(customer)}
                />
            </RowVertical>
            <RowVertical name="Escoger Camarero">
                <SearchPicker
                    text="Buscar"
                    items={this.props.users}
                    onItemSelect={(user) => this.waiterSelect(user)}
                />
            </RowVertical>
            <TextInput
                label="Numero de mesa"
                value={this.state.tableNumber}
                onChangeText={(text) => this.setState({ tableNumber: text })}
                style={styles.input}
                keyboardType="numeric"
              />
            <FAB
                style={{ ...styles.fab, backgroundColor: this.colors.primary }}
                icon="check"
                color="white"
                onPress={this.onPressFab}
            />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 12
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 30,
  },
  input: {
    marginBottom: 20,
  },
});

const mapStateToProps = state => {
  const userType = state.appConfigReducer.userType;
  return {
    token: state.appConfigReducer.token,
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    customers: state.customerReducer.customers,
    userAuth: state.appConfigReducer.user,
    orderStatus: state.appConfigReducer.orderStatus,
    users: state.usersReducer.users.filter(x=> x.type === userType["WAITER"])
  }
};

const mapDispatchToProps = {
  AddOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OrderStep3Screen));
