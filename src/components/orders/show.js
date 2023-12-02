import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { List, withTheme, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import Row from './../lib/row'

class OrderShowScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      let item = this.props.route.params.item;

      this.state = {
        id: item.id,
        cashierID: item.cashierID,
        waiterID: item.waiterID,
        chefID: item.chefID,
        total: item.total,
        date: item.date,
        paymentMethod: item.paymentMethod,
        orderStatus: item.orderStatus,
        customer: item.customer,
        products: item.products,
        tableNumber: item.tableNumber
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            this.setState({
                id: item.id,
                cashierID: item.cashierID,
                waiterID: item.waiterID,
                chefID: item.chefID,
                total: item.total,
                date: item.date,
                paymentMethod: item.paymentMethod,
                orderStatus: item.orderStatus,
                customer: item.customer,
                products: item.products,
                tableNumber: item.tableNumber
            })
        }
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('Orders');
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

    renderFoodItem = ({ item }) => (
      <List.Item
        title={item.name}
        description={`Price: $${item.price}`}
        style={styles.item}
        right={() => <Text>Cantidad: {item.quantity}</Text>}
      />
    );
  
    render() {
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Row name="Fecha">
                {this.state.date}
            </Row>
            <Row name="Total">
                {this.state.total}
            </Row>
            <Row name="Pago">
                {this.state.paymentMethod}
            </Row>
            <Row name="Mesa">
                {this.state.tableNumber}
            </Row>
            <Row name="Cajero">
                {this.getUserName(this.state.cashierID)}
            </Row>
            <Row name="Mesero">
                {this.getUserName(this.state.waiterID)}
            </Row>
            <Row name="Cocinero">
                {this.getUserName(this.state.chefID)}
            </Row>
            <Row name="Cliente">
                {this.state.customer.name}
            </Row>
            <Row name="Productos"></Row>
          </ScrollView>
            <FlatList
            data={this.state.products}
            renderItem={this.renderFoodItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      );
    }
  }
const styles = StyleSheet.create({
  container: {
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
  item: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
    users: state.usersReducer.users
});

export default connect(mapStateToProps, null)(withTheme(OrderShowScreen));
