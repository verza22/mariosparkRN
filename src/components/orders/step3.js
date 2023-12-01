import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { List, withTheme, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import RowVertical from './../lib/rowVertical'
import SearchPicker from './../lib/searchPicker'
import { userType } from './../../data'

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
        customer: null
      };
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

    getUserName(userID){
        let i = this.props.users.findIndex(x=> x.id === userID);
        return i>=0 ? this.props.users[i].name : "";
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
});

const mapStateToProps = state => ({
    customers: state.customerReducer.customers,
    users: state.usersReducer.users.filter(x=> x.type === userType.WAITER)
});

export default connect(mapStateToProps, null)(withTheme(OrderStep3Screen));
