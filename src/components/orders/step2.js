import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { List, withTheme, Text, IconButton, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import Row from './../lib/row'

class OrderStep2Screen extends Component {
    constructor(props) {
      super(props);

      this.colors = props.theme.colors;

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      this.plus = this.plus.bind(this);
      this.minus = this.minus.bind(this);
      this.remove = this.remove.bind(this);
      this.onPressFab = this.onPressFab.bind(this);

      let products = this.props.route.params.products;

      this.state = {
        products: this.getProducts(products)
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.products !== prevProps.route.params.products) {
            let products = this.props.route.params.products;
            this.setState({
                products: this.getProducts(products)
            })
        }
    }

    getProducts(products){
        let productsAux = [];
        products.forEach(p=>{
            let i = productsAux.findIndex(x=> x.id === p.id);
            if(i>=0){
                productsAux[i].quantity += 1; 
            }else{
                productsAux.push({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    quantity: 1
                });
            }
        });
        return productsAux;
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('OrderStep1');
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

    plus(item){
        let products = [...this.state.products];
        let i = products.findIndex(x=> x.id === item.id);
        if(i>=0){
            products[i].quantity += 1; 
            this.setState({products: products});
        }
    }

    minus(item){
        let products = [...this.state.products];
        let i = products.findIndex(x=> x.id === item.id);
        if(i>=0){
            products[i].quantity -= 1; 
            if(products[i].quantity < 1){
                products = products.filter(x=> x.id !== item.id);
            }
            this.setState({products: products});
            if(products.length < 1){
                this.props.navigation.navigate('OrderStep1', { clearProduct: true });
            }
        }
    }

    remove(item){
        let products = [...this.state.products];
        products = products.filter(x=> x.id !== item.id);
        this.setState({products: products});
        if(products.length < 1){
            this.props.navigation.navigate('OrderStep1', { clearProduct: true });
        }
    }

    onPressFab()  {
      this.props.navigation.navigate('OrderStep3', { products: this.state.products });
  };

    renderFoodItem = ({ item }) => (
      <List.Item
        title={item.name}
        style={styles.item}
        description={() => 
            <View>
                <Text>Precio: {item.price}</Text>
                <Text>Cantidad: {item.quantity}</Text>
            </View>
        }
        right={() => 
            <View style={styles.viewBtn}>
                <IconButton
                    icon="plus"
                    mode="contained"
                    size={20}
                    onPress={() => this.plus(item)}
                />
                <IconButton
                    icon="minus-thick"
                    mode="contained"
                    size={20}
                    onPress={() => this.minus(item)}
                />
                <IconButton
                    icon="trash-can"
                    mode="contained"
                    size={20}
                    onPress={() => this.remove(item)}
                />
            </View>
        }
      />
    );
  
    render() {
  
      return (
        <View style={styles.container}>
          <Row name="Productos" style={styles.row}></Row>
            <FlatList
            data={this.state.products}
            renderItem={this.renderFoodItem}
            keyExtractor={item => item.id.toString()}
          />
           <FAB
                style={{ ...styles.fab, backgroundColor: this.colors.primary }}
                icon="arrow-right"
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginLeft: 30, 
    marginTop: 10
  },
  input: {
    marginBottom: 20,
  },
  imageButton: {
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
  viewBtn:{
    flexDirection: 'row',
    alignItems: 'end',
  }
});

const mapStateToProps = state => ({
    users: state.usersReducer.users
});

export default connect(mapStateToProps, null)(withTheme(OrderStep2Screen));
